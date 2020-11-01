import { Action } from "model/Action";
import { Message } from "model/Message";

export interface Store {
  messageList: Message[];
  dispatch: (action: Action) => void;
}
