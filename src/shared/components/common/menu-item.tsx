"use client";
import { cn } from "@/shared/utils";

import ActiveLink from "./active-link";

interface MenuItemProps {
  url: string;
  title: string;
  icon: React.ReactNode;
  onlyIcon?: boolean;
}
function MenuItem({ icon, onlyIcon, title = "", url = "/" }: MenuItemProps) {
  return (
    <li>
      <ActiveLink url={url}>
        <span
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 dark:bg-transparent dark:text-gray-300",
            {
              "scale-105": !onlyIcon,
            },
          )}
        >
          {icon}
        </span>
        {onlyIcon ? null : title}
      </ActiveLink>
    </li>
  );
}
export default MenuItem;
