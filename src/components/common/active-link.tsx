"use client";

import { ActiveLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ url, children }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === url;
  return (
    <Link
      href={url}
      className={`p-3 rounded-md flex items-center gap-3 dark:text-graySlate transition-all ${
        isActive
          ? "bg-primary !text-white svg-animate"
          : "hover:!text-primary hover:bg-primary/20"
      }`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
