import { ActionType } from "constant";

export interface Action {
  type: ActionType;
  message?: string;
};
