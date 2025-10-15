import { model, models, Schema } from "mongoose";

import { LessonType } from "../constants";
import { Lesson } from "../types/models";

const lessonSchema = new Schema<Lesson>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  lecture: {
    type: Schema.Types.ObjectId,
    ref: "Lecture",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  order: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  video_url: {
    type: String,
  },
  content: {
    type: String,
  },
  type: {
    type: String,
    enum: Object.values(LessonType),
    default: LessonType.VIDEO,
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const LessonModel = models.Lesson || model<Lesson>("Lesson", lessonSchema);

export default LessonModel;
