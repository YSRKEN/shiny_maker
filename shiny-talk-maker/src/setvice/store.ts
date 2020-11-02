import { Action } from "model/Action";
import { Message } from "model/Message";
import { Store } from "model/Store";
import { createContext, useState } from "react";

export const useStore = (): Store => {
  // メッセージ一覧
  const [messageList, setMessageList] = useState<Message[]>([]);
  // メッセージ一覧における分割位置
  // -1だと未分割、1だとインデックス0～1のものが上部、それ以外が下部となる
  const [messageListSplitIndex, setMessageListSplitIndex] = useState(-1);

  const dispatch = (action: Action) => {
    switch (action.type) {
      // メッセージを追加する
      case 'addMessage': {
        const message = JSON.parse(action.message as string) as Message;
        setMessageList([...messageList, {...message}]);
        break;
      }
      // 指定位置のメッセージを全削除する
      case 'deleteMessage': {
        const newMessageList: Message[] = [];
        for (let i = 0; i < messageList.length; i += 1) {
          if (messageListSplitIndex !== i) {
            newMessageList.push({...messageList[i]});
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
    messageList,
    messageListSplitIndex,
    dispatch
  }
};

export const ApplicationContext = createContext({} as Store);
