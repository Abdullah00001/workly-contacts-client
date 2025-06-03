import { FC } from "react";
import { NavLink } from "react-router-dom";
import { INavItem } from "./SideBarNav";

const NavButton: FC<INavItem> = (item) => {
  return (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) =>
        `flex items-center font-bold justify-between px-4 py-3 rounded-full text-sm ${
          isActive
            ? "bg-blue-100 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      <div className="flex items-center gap-4">
        {item.icon}
        <span>{item.pathName}</span>
      </div>
    </NavLink>
  );
};

export default NavButton;
