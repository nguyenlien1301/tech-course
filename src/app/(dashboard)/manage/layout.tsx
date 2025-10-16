import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import PageNotFound from "@/app/not-found";
import { getUserInfo } from "@/modules/user/actions";
import { UserRole } from "@/shared/constants";

// Layout này là layout của manage (admin)
const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  // userId: là id của ng dùng đã đăng nhập
  const { userId } = await auth();

  // Nếu ko có userId thì sẽ path qua trang đăg nhập yêu cầu ng dùng đăg nhập
  if (!userId) return redirect("/");
  // userInfo: để lấy thông tin user về thông qua hàm getUserInfo và truyền vào userId
  const userInfo = await getUserInfo({ userId });

  // Kiểm tra nếu userInfo và userInfo.role ko phải là ADMIN thì trả về trang not found
  if (userInfo && userInfo.role !== UserRole.ADMIN) return <PageNotFound />;

  return <div>{children}</div>;
};

export default AdminLayout;
