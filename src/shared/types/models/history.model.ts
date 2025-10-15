import { Document, Schema } from "mongoose";

export interface History extends Document {
  _id: string;
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  lesson: Schema.Types.ObjectId;
  created_at: Date;
}
