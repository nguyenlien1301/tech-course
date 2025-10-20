import { Schema } from "mongoose";

export interface Favorite extends Document {
  _id: string;
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  created_at: Date;
}
