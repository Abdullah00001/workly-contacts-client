import { FC, JSX } from "react";
import {
  AiOutlineClockCircle,
  AiOutlineContacts,
  AiOutlineDelete,
  AiOutlineStar,
} from "react-icons/ai";
import NavButton from "./NavButton";

export interface INavItem {
  path: string;
  pathName: string;
  icon: JSX.Element;
}
const SideBarNav: FC = () => {
  const navItems: INavItem[] = [
    {
      path: "/",
      pathName: "Contacts",
      icon: <AiOutlineContacts className="w-5 h-5" />,
    },
    {
      path: "/recent",
      pathName: "Recent",
      icon: <AiOutlineClockCircle className="w-5 h-5" />,
    },
    {
      path: "/favorite",
      pathName: "Favorite",
      icon: <AiOutlineStar className="w-5 h-5" />,
    },
    {
      path: "/trash",
      pathName: "Trash",
      icon: <AiOutlineDelete className="w-5 h-5" />,
    },
  ];
  return (
    <div className="flex flex-col mt-5">
      {navItems.map(({ icon, path, pathName }) => (
        <NavButton icon={icon} path={path} pathName={pathName} key={pathName} />
      ))}
    </div>
  );
};

export default SideBarNav;
