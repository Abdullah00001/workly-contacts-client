import { FC } from "react";
import Hamburger from "../ui/header/Hamberger";
import Search from "../ui/header/Search";
import Logo from "../ui/header/Logo";
import Avatar from "../ui/header/Avatar";

const Header: FC = () => {
  return (
    <section>
      <div className="w-full px-2 py-4">
        <div className="flex items-center justify-between">
          <div className="">
            <div className="flex justify-start items-center space-x-2">
              <div className="lg:hidden">
                <Hamburger />
              </div>
              <div>
                <Logo />
              </div>
            </div>
          </div>
          <div className="md:block hidden">
            <Search />
          </div>
          <div className="">
            <div className="flex items-center w-full space-x-2">
              <div className="md:hidden block">
                {/* <div className="flex justify-end md:justify-center"> */}
                <div>
                  <Search />
                </div>
                {/* </div> */}
              </div>
              <div className="">
                <Avatar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
