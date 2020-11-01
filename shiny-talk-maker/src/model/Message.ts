import { CharacterType } from "model/CharacterType";

export interface Message {
  name: string;
  talk: string;
  type: CharacterType;
}
