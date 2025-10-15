import { model, models, Schema } from "mongoose";

import { CommentStatus } from "../constants";
import { Comment } from "../types/models";

const commentSchema = new Schema<Comment>({
  content: {
    type: String,
    required: true,
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: Object.values(CommentStatus),
    default: CommentStatus.PENDING,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    // ref tới một cái comment khác là cũng chính là comment hiện tại luôn
    ref: "Comment",
    default: null,
  },
  level: {
    type: Number,
    // default: 0: mình tạo ra sẽ là cấp độ 0, ng ta reply sẽ là cấp độ 1
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const CommentModel = models.Comment || model<Comment>("Comment", commentSchema);

export default CommentModel;
