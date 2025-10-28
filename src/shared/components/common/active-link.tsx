"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/utils";

interface ActiveLinkProps {
  url: string;
  children: React.ReactNode;
}

const ActiveLink = ({ children, url }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link
      href={url}
      className={cn(
        "flex items-center gap-3 rounded-md p-2 font-medium dark:text-gray-300 transition-all",
        {
          "svg-animate bg-primary font-bold !text-white": isActive,
          "hover:bg-primary/20 border-transparent hover:!text-primary dark:hover:!text-white border hover:border-primary":
            !isActive,
        },
        // {
        //   "svg-animate border-gray-200 bg-gray-100 font-bold": isActive,
        //   "border-transparent font-medium": !isActive,
        // },
      )}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
