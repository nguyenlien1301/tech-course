import { UserRole, UserStatus } from "@/types/enum";
import { Document, model, models, Schema } from "mongoose";

export interface User extends Document {
  clerkId: string; // Đây là id mặc định của clerk nên ko cần tạo
  name: string;
  username: string;
  email: string;
  courses: Schema.Types.ObjectId[]; // Lưu các khoá học mà user đã mua
  avatar: string;
  status: UserStatus; // Trạng thái user
  role: UserRole; // Phân quyền
  createdAt: Date; // Ngày tạo user
}

const userSchema = new Schema<User>({
  clerkId: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "course", // ref là referent đc liên kết với bảng khác để lấy dữ liệu từ model đó.
    },
  ],
  avatar: {
    type: String,
  },
  status: {
    type: String,
    enum: Object.values(UserStatus), // Object.values: là mình sẽ lấy một trong những cái đó (trả ra mảng)
    default: UserStatus.ACTIVE,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// models: này là đối tượng của mongo, nó sẽ chứa tất cả những model đã đc đăng kí trước đó
// ở đây có nghĩa là nếu mà trong model đã đăng kí trước đó có user rồi thì mình sẽ dùng. Và lúc ban đầu mới khai báo có nghĩa là nó chưa có (undefi) và nó sẽ chạy vào model("User", userSchema);

const UserModel = models.User || model<User>("User", userSchema);
export default UserModel;
