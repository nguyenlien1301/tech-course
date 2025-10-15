import { model, models, Schema } from "mongoose";

import { Lecture } from "../types/models";

const lectureSchema = new Schema<Lecture>({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  order: {
    type: Number,
    default: 0,
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

const LectureModel = models.Lecture || model<Lecture>("Lecture", lectureSchema);

export default LectureModel;
