"use client";

import React, { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isButtonActive: boolean;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
};
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [isAllowHover, setIsAllowHover] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(true); // sidebar mở ban đầu
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false); // button false ban đầu

  return (
    <SidebarContext.Provider
      value={{ isOpen, setIsOpen, isButtonActive, setIsButtonActive }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useUser must be used within and UserContextProvider");
  }

  return context;
};

// // Ở đây là client nhưng mọi thằng con của nó là client
// // Nhưng khi sử dụng ở server thì ở đây nó vẫn hiểu là server component
// // Nó chỉ là client khúc lấy user ở trên thôi, nhưng đưa vào sử dụng trong server thì nó vẫn sẽ hiểu là server component
// // Ko phải dùng client là tất cả con của nó điều biến thành client
// // Chỗ nào dùng client thì chỗ nó mới là client -side
// // Chỗ nào ko dùng client thì chỗ đó là server component như bình thường
