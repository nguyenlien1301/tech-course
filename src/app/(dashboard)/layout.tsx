import React from "react";

import LayoutWrapper from "@/shared/components/common/layout-wrapper";
import { Header, MenuMobile, Sidebar } from "@/shared/components/layout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutWrapper>
      <Sidebar />
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
