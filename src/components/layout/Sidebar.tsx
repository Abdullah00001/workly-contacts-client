import { FC } from "react";
import CreateContactButton from "../ui/sidebar/CreateContactButton";
import SideBarNav from "../ui/sidebar/SideBarNav";

const Sidebar: FC = () => {
  return (
    <div className="px-4">
      <CreateContactButton />
      <SideBarNav />
    </div>
  );
};

export default Sidebar;
