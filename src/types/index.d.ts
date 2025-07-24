import React from "react";

type ActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};
type MenuItemProps = {
  url: string;
  title: string;
  icon: React.ReactNode;
};

// User
// Đây là những tham số mà bắt buộc ng dùng phải truyền vào (ràng buộc)
type CreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
  // hai tham số dưới đây mặc định nó đã có nên nó sẽ lấy mặc định và tự thêm vào ko cần phải viết ra
  // role: đã có mặc định là: UserRole.USER,
  // status:đã có mặc định là UserStatus.ACTIVE
  // VD: const user = await createUser({
  // clerkId: "clerk_123",
  // username: "nguyenvanlien",
  // email: "lien@gmail.com"
  // })
  // --> Đây là 3 trường bắt buộc phải có khi tạo user
};

export { ActiveLinkProps, CreateUserParams, MenuItemProps };
