import { CHARACTER_LIST } from "constant";
import { Character } from "model/Character";

/**
 * フルネームからキャラを検索する
 * @param fullName フルネーム
 * @returns キャラ
 */
export const findCharacterByFullName = (fullName: string): Character => {
  return CHARACTER_LIST.filter(c => c.fullName === fullName)[0];
};
