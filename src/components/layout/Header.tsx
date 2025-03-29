import { FC } from "react";
import Hamburger from "../ui/Hamberger";
import Search from "../ui/Search";

const Header: FC = () => {
  return (
    <section>
      <div className="w-full px-2">
        <div className="flex items-center">
          <div className="w-[30%]">
            <div className="lg:hidden">
              <Hamburger />
            </div>
          </div>
          <div className="w-[50%]">
            <div className="flex justify-end">
              <div>
                <Search />
              </div>
            </div>
          </div>
          <div className="w-[20%]">
            <h1 className="ml-2">hello</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
