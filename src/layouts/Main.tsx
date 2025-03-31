import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import CreateContactSmall from "../features/create contact/ui/CreateContactSmall";

const Main: FC = () => {
  return (
    <>
      <Header />
      <div className="hidden lg:block mt-5">
        <div className="flex h-[89vh]">
          <div className="w-[30%] xl:w-[20%]">
            <Sidebar />
          </div>
          <div className="w-[70%] xl:w-[80%] p-4 border-gray-400 border-t border-l rounded-tl-[8px]">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="block px-4 py-2 relative lg:hidden">
        <Outlet />
        <div className="fixed top-[80%] left-[80%] md:left-[90%] md:top-[85%]">
          <CreateContactSmall />
        </div>
      </div>
    </>
  );
};

export default Main;
