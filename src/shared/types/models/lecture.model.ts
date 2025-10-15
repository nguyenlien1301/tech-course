import { Document, Schema } from "mongoose";

export interface Lecture extends Document {
  _id: string;
  title: string;
  course: Schema.Types.ObjectId;
  lessons: Schema.Types.ObjectId[];
  order: number;
  _destroy: boolean;
  created_at: Date;
}
