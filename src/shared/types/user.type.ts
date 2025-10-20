import { User } from "./models";

export interface UserItemData extends Omit<User, "courses"> {}

// hai tham số dưới đây mặc định nó đã có nên nó sẽ lấy mặc định và tự thêm vào ko cần phải viết ra
// role: đã có mặc định là: UserRole.USER,
// status:đã có mặc định là UserStatus.ACTIVE
// VD: const user = await createUser({
// clerkId: "clerk_123",
// username: "nguyenvanlien",
// email: "lien@gmail.com"
// })
// --> Đây là 3 trường bắt buộc phải có khi tạo user

// User
// Đây là những tham số mà bắt buộc ng dùng phải truyền vào (ràng buộc)
export type CreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

export type UpdateProfileUserParams = {
  name?: string;
  username?: string;
  phone?: string;
  bio?: string;
};
