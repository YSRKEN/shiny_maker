import { Action } from "model/Action";
import { Message } from "model/Message";
import { Store } from "model/Store";
import { createContext, useState } from "react";

export const useStore = (): Store => {
  // メッセージ一覧
  const [messageList, setMessageList] = useState<Message[]>([]);

  const dispatch = (action: Action) => {
    switch (action.type) {
      // メッセージを追加する
      case 'addMessage': {
        const message = JSON.parse(action.message as string) as Message;
        setMessageList([...messageList, {...message}]);
        break;
      }
    }
  };

  return {
    messageList,
    dispatch
  }
};

export const ApplicationContext = createContext({} as Store);
