"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";
import { allValue, CourseOptions } from "@/shared/constants";
import { courseSortOptions } from "@/shared/constants/course-constant";
import { useSidebarContext } from "@/shared/contexts";
import { useQueryString } from "@/shared/hooks";
import { cn } from "@/shared/utils";

import { ModeToggle } from "../common";
import { IconSearch, IconUsers } from "../icons";

const Header = () => {
  const { isButtonActive } = useSidebarContext();
  const { userId } = useAuth();
  const { handleChangeQs, handleSearchData, handleSetDefaultStatus } =
    useQueryString();

  return (
    <header
      className={cn(
        "borderDarkMode bgDarkMode fixed inset-x-0 top-0 z-10 border-b border-gray-200 bg-white px-6 py-4 shadow-sm transition-all duration-300 ease-in-out flex items-center justify-between",
        isButtonActive ? "lg:left-[80px]" : "left-0 lg:left-[300px]",
      )}
    >
      <div className="flex gap-3">
        {/* <div className="w-full lg:ml-7 lg:w-[300px] xl:w-[400px]">
          <Input
            className="rounded-full"
            placeholder="Tìm kiếm khoá học..."
            onChange={handleSearchData}
          />
          <IconSearch className="size-5" />
        </div> */}
        <div className="relative w-full lg:ml-7 lg:w-[300px] xl:w-[400px]">
          <Input
            className="rounded-full pl-5 pr-10" // chừa chỗ cho icon
            placeholder="Tìm kiếm khoá học..."
            onChange={handleSearchData}
          />
          <IconSearch className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-gray-500" />
        </div>
        <Select
          defaultValue={handleSetDefaultStatus("option")}
          onValueChange={(value) =>
            handleChangeQs("option", value as CourseOptions)
          }
        >
          <SelectTrigger className="w-[150px] lg:w-[160px]">
            <SelectValue placeholder="Chọn trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={allValue}>Tất cả</SelectItem>
              {courseSortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-auto flex items-center justify-end gap-5">
        <ModeToggle />
        {userId ? (
          <></> // <UserButton />
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
