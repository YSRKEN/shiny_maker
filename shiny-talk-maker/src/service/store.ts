import { CHARACTER_LIST } from "constant";
import { Action } from "model/Action";
import { Message } from "model/Message";
import { Store } from "model/Store";
import { createContext, useEffect, useState } from "react";
import { findCharacterByFullName } from "service/utility";

export const useStore = (): Store => {
  // キャラクター名
  const [characterName, setCharacterName] = useState('櫻木真乃');
  // 入力キャラクター名
  const [otherName, setOtherName] = useState('観客');
  // メッセージの内容
  const [talk, setTalk] = useState('はい、鳩さんとは仲良しで、\nつい時間を忘れて遊んでしまうんです');
  // 現在入力中のメッセージ
  const [nowMessage, setNowMessage] = useState<Message>({
    name: '真乃', talk: 'はい、鳩さんとは仲良しで、\nつい時間を忘れて遊んでしまうんです', type: 'idol'
  });
  // メッセージ一覧
  const [messageList, setMessageList] = useState<Message[]>([]);
  // メッセージ一覧における分割位置
  // -1だと未分割、1だとインデックス0～1のものが上部、それ以外が下部となる
  const [messageListSplitIndex, setMessageListSplitIndex] = useState(-1);

  // 入力フォームの内容が変更された際、入力されることになるメッセージの内容を更新する
  useEffect(() => {
    const character = findCharacterByFullName(characterName);
    if (character.type !== 'other') {
      setNowMessage({ name: character.shortName, talk, type: character.type });
    } else {
      setNowMessage({ name: otherName, talk, type: character.type });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterName, otherName, talk]);

  const dispatch = (action: Action) => {
    switch (action.type) {
      // setter
      case 'setCharacterName':
        setCharacterName(action.message as string);
        break;
      case 'setOtherName':
        setOtherName(action.message as string);
        break;
      case 'setTalk':
        setTalk(action.message as string);
        break;
      // メッセージを追加する
      case 'addMessage': {
        setMessageList([...messageList, { ...nowMessage }]);
        break;
      }
      // 指定位置にメッセージを挿入する
      case 'insertMessage': {
        const newMessageList: Message[] = [];
        for (let i = 0; i < messageList.length; i += 1) {
          newMessageList.push({ ...messageList[i] });
          if (messageListSplitIndex === i) {
            newMessageList.push(nowMessage);
          }
        }
        setMessageList(newMessageList);
        setMessageListSplitIndex(-1);
        break;
      }
      // 指定位置のメッセージを全削除する
      case 'deleteMessage': {
        const newMessageList: Message[] = [];
        for (let i = 0; i < messageList.length; i += 1) {
          if (messageListSplitIndex !== i) {
            newMessageList.push({ ...messageList[i] });
          }
        }
        setMessageList(newMessageList);
        setMessageListSplitIndex(-1);
        break;
      }
      // メッセージを全削除する
      case 'deleteAllMessage': {
        setMessageList([]);
        break;
      }
      // メッセージを上に動かす
      case 'upToMessage': {
        if (messageListSplitIndex === 0) {
          break;
        }
        const newMessageList: Message[] = [];
        for (let i = 0; i < messageList.length; i += 1) {
          if (i === messageListSplitIndex - 1) {
            newMessageList.push({ ...messageList[i + 1] });
          } else if (i === messageListSplitIndex) {
            newMessageList.push({ ...messageList[i - 1] });
          } else {
            newMessageList.push({ ...messageList[i] });
          }
        }
        setMessageList(newMessageList);
        setMessageListSplitIndex((i) => i - 1);
        break;
      }
      // メッセージを下に動かす
      case 'downToMessage': {
        if (messageListSplitIndex === messageList.length - 1) {
          break;
        }
        const newMessageList: Message[] = [];
        for (let i = 0; i < messageList.length; i += 1) {
          if (i === messageListSplitIndex + 1) {
            newMessageList.push({ ...messageList[i - 1] });
          } else if (i === messageListSplitIndex) {
            newMessageList.push({ ...messageList[i + 1] });
          } else {
            newMessageList.push({ ...messageList[i] });
          }
        }
        setMessageList(newMessageList);
        setMessageListSplitIndex((i) => i + 1);
        break;
      }
      // フォームの内容でメッセージを上書き
      case 'upDateMessageFromForm': {
        const newMessageList: Message[] = [];
        for (let i = 0; i < messageList.length; i += 1) {
          if (i === messageListSplitIndex) {
            newMessageList.push({ ...nowMessage });
          } else {
            newMessageList.push({ ...messageList[i] });
          }
        }
        setMessageList(newMessageList);
        break;
      }
      // フォームの内容をこのメッセージで上書き
      case 'upDateMessageToForm': {
        setNowMessage({ ...messageList[messageListSplitIndex] });
        setTalk(messageList[messageListSplitIndex].talk);
        const temp = CHARACTER_LIST.filter(c => c.shortName === messageList[messageListSplitIndex].name);
        if (temp.length > 0) {
          setCharacterName(temp[0].fullName);
        } else {
          setCharacterName('その他');
          setOtherName(messageList[messageListSplitIndex].name);
        }
        break;
      }
      // メッセージ一覧の分割位置を変更する
      case 'setSplitIndex': {
        const index = parseInt(action.message as string);
        if (messageListSplitIndex !== index) {
          setMessageListSplitIndex(index);
        } else {
          setMessageListSplitIndex(-1);
        }
        break;
      }
    }
  };

  return {
    characterName,
    otherName,
    talk,
    nowMessage,
    messageList,
    messageListSplitIndex,
    dispatch
  }
};

export const ApplicationContext = createContext({} as Store);
