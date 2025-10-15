import { Document, Schema } from "mongoose";

import { CommentStatus } from "@/shared/constants";

export interface Comment extends Document {
  _id: string;
  content: string;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: CommentStatus;
  //   parentId: là có hoặc ko đôi khi comment ko có reply và nó sẽ là thằng comment khác
  parentId?: Schema.Types.ObjectId;
  // reply cấp độ mấy
  level: number;
  created_at: Date;
}
