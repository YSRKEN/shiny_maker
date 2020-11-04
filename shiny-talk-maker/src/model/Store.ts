import { Action } from "model/Action";
import { Message } from "model/Message";

export interface Store {
  characterName: string;
  otherName: string;
  talk: string;
  nowMessage: Message;
  messageList: Message[];
  messageListSplitIndex: number;
  saveFlg: boolean;
  dispatch: (action: Action) => void;
}
