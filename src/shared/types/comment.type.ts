import { Comment } from "./models";

export interface CommentItemData extends Omit<Comment, "user" | "lesson"> {
  lesson: {
    title: string;
  };
  user: {
    name: string;
    avatar: string;
  };
}

export type CreateCommentParams = {
  content: string;
  lesson: string;
  user: string;
  level: number;
  parentId?: string;
  path?: string;
};
