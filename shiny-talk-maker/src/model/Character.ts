import { CharacterType } from "model/CharacterType";

/* キャラクターを表す */
export interface Character {
  // 短縮名
  shortName: string;
  // フルネーム
  fullName: string;
  // キャラクターの属性
  type: CharacterType;
}
