import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getUserInfo } from "@/modules/user/actions";
import LayoutWrapper from "@/shared/components/common/layout-wrapper";
import {
  Header,
  MenuMobile,
  MenuMobileUser,
  Sidebar,
  SidebarUser,
} from "@/shared/components/layout";
import { UserRole } from "@/shared/constants";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const userInfo = await getUserInfo({ userId });

  return (
    <LayoutWrapper>
      {!userId && (
        <>
          <SidebarUser />
          <MenuMobileUser />
        </>
      )}
      {userInfo?.role === UserRole.ADMIN ? (
        <>
          <Sidebar />
          <MenuMobile />
        </>
      ) : (
        <>
          <SidebarUser />
          <MenuMobileUser />
        </>
      )}
      <MenuMobile />
      <div className="hidden lg:block" />
      <main className="px-5 pb-20 pt-[100px] lg:pb-10">
        <Header />
        {children}
      </main>
    </LayoutWrapper>
  );
};

export default layout;
