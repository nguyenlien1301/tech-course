import { model, models, Schema } from "mongoose";

import { Courselevel, CourseStatus } from "../constants";
import { Course } from "../types/models";

const courseSchema = new Schema<Course>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  intro_url: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  sale_price: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(CourseStatus),
    default: CourseStatus.PENDING,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  level: {
    type: String,
    enum: Object.values(Courselevel),
    default: Courselevel.BEGINNER,
  },
  views: {
    type: Number,
    default: 0,
  },
  rating: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
  info: {
    requirements: {
      type: [String],
    },
    benefits: {
      type: [String],
    },
    qa: [
      {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
    ],
  },
  lectures: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lecture",
    },
  ],
  _destroy: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const CourseModel = models.Course || model<Course>("Course", courseSchema);

export default CourseModel;
