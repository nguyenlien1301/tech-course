"use client";
import { menuItems } from "@/shared/constants/menu-constant";

import { MenuItem } from "../common";

const MenuMobile = () => {
  return (
    <ul className="bgDarkMode borderDarkMode fixed bottom-0 left-0 z-20 flex h-16 w-full justify-start gap-5 overflow-x-auto whitespace-nowrap border-t p-3 lg:hidden">
      {menuItems.map((item) => (
        <MenuItem
          key={item.title}
          icon={item.icon}
          onlyIcon
          title={item.title}
          url={item.url}
        />
      ))}
    </ul>
  );
};

export default MenuMobile;
