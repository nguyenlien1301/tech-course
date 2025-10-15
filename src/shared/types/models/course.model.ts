import { Schema } from "mongoose";

import { Courselevel, CourseStatus } from "@/shared/constants";

export interface Course extends Document {
  _id: string;
  title: string;
  image: string;
  intro_url: string;
  desc: string;
  price: number; // 500đ
  sale_price: number; // 900đ
  slug: string;
  status: CourseStatus;
  author: Schema.Types.ObjectId;
  level: Courselevel;
  views: number;
  rating: Schema.Types.ObjectId[];
  info: {
    requirements: string[];
    benefits: string[];
    qa: {
      question: string;
      answer: string;
    }[];
  };
  lectures: Schema.Types.ObjectId[];
  _destroy: boolean;
  created_at: Date;
}
