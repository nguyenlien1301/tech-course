import { History } from "./models";

export interface HistoryItemData extends Omit<History, ""> {}

// History
export type CreateHistoryParams = {
  course: string;
  lesson: string;
  checked: boolean | string;
  path?: string;
};
