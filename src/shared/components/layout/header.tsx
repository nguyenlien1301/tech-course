"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { useSidebarContext } from "@/shared/contexts";
import { cn } from "@/shared/utils";

import { ModeToggle } from "../common";
import { IconUsers } from "../icons";

const Header = () => {
  const { isButtonActive } = useSidebarContext();
  const { userId } = useAuth();
  // const { handleSearchData } = useQueryString();
  // 🕐 Hàm xác định thời gian trong ngày
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning 🌤️";
    if (hour < 18) return "Good afternoon 🌇";

    return "Good evening 🌙";
  };

  return (
    <header
      className={cn(
        "borderDarkMode bgDarkMode fixed inset-x-0 top-0 z-10 border-b border-gray-200 gap-4 bg-white px-6 py-4 shadow-sm transition-all duration-300 ease-in-out flex items-center justify-between",
        isButtonActive ? "lg:left-[80px]" : "left-0 lg:left-[300px]",
      )}
    >
      <div className="text-xl font-bold text-primary md:text-2xl">
        {getGreeting()}
      </div>
      <div />
      {/* <div className="relative w-full lg:ml-7 lg:w-[300px] xl:w-[400px]">
        <Input
          className="rounded-full pl-5 pr-10"
          placeholder="Tìm kiếm khoá học..."
          onChange={handleSearchData}
        />
        <IconSearch className="absolute right-3 top-1/2 size-5 -translate-y-1/2 cursor-pointer text-gray-500" />
      </div> */}
      <div className="mt-auto flex items-center justify-end gap-5">
        <ModeToggle />
        {userId ? (
          <UserButton />
        ) : (
          <Link
            className="flex size-10 h-10 items-center justify-center gap-2 rounded-lg bg-secondary font-semibold text-white xl:w-auto xl:px-4"
            href="/sign-in"
          >
            <IconUsers className="size-5" />
            <span className="hidden xl:inline">Đăng nhập</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
