import { menuItems } from "@/constants";
import { MenuItemProps } from "@/types";
import { UserButton } from "@clerk/nextjs";
import { ActiveLink } from "../common";
import { ModeToggle } from "../common/mode-toggle";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200/10 bg-white flex flex-col dark:bg-grayDark">
      <a href="/" className="logo font-bold text-3xl inline-block mb-5">
        TechDev
      </a>
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item.title}
            url={item.url}
            title={item.title}
            icon={item.icon}
          ></MenuItem>
        ))}
      </ul>
      <div className="flex items-center mt-auto justify-end gap-5">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};

function MenuItem({ url = "/", title = "", icon }: MenuItemProps) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
}

export default Sidebar;
