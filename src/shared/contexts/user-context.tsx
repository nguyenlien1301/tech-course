"use client";

import { useAuth } from "@clerk/nextjs";
import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";

import { getUserInfo } from "@/modules/user/actions";

import { User } from "../types/models";

const UserContext = createContext<{
  userInfo: User | null;
  setUserInfo: Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const { userId } = useAuth();

  useEffect(() => {
    async function fetchUserInfo() {
      const user = await getUserInfo({ userId: userId || "" });

      if (user) {
        setUserInfo(user);
      }
    }
    fetchUserInfo();
  }, [userId]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

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
