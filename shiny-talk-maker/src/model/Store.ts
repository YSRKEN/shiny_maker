import { Action } from "model/Action";
import { Message } from "model/Message";

export interface Store {
  nowMessage: Message;
  messageList: Message[];
  messageListSplitIndex: number;
  dispatch: (action: Action) => void;
}
