import { Document, Schema } from "mongoose";

import { UserRole, UserStatus } from "@/shared/constants";

export interface User extends Document {
  _id: string;
  clerkId: string; // Đây là id mặc định của clerk nên ko cần tạo
  name: string;
  username: string;
  email: string;
  courses: Schema.Types.ObjectId[]; // Lưu các khoá học mà user đã mua
  avatar: string;
  status: UserStatus; // Trạng thái user
  role: UserRole; // Phân quyền
  created_at: Date; // Ngày tạo user
}
