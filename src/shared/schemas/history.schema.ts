import { model, models, Schema } from "mongoose";

import { History } from "../types/models";

const historySchema = new Schema<History>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const HistoryModel = models.History || model<History>("History", historySchema);

export default HistoryModel;
