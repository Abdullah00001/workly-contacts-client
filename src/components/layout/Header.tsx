import { FC } from 'react';
import Hamburger from '../ui/header/Hamberger';
import Search from '../ui/header/Search';
import Logo from '../ui/header/Logo';
import Avatar from '../ui/header/Avatar';

const Header: FC = () => {
  return (
    <section>
      <div className="w-full p-2 md:px-4 md:py-2">
        <div className="block md:hidden">
          <div className="flex items-center justify-between md:hidden">
            <div className="w-[20%] flex justify-start items-center space-x-2">
              <div>
                <Hamburger />
              </div>
              <div>
                <Logo />
              </div>
            </div>
            <div className="w-[60%]">
              <Search />
            </div>
            <div className="w-[20%] flex justify-end">
              <Avatar />
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            <div className="w-[40%] lg:w-[30%] flex justify-start items-center space-x-2">
              <div className="lg:hidden">
                <Hamburger />
              </div>
              <div>
                <Logo />
              </div>
            </div>
            <div className="w-[60%] flex lg:w-[70%] lg:justify-between md:justify-end items-center">
              <div className="w-[80%]">
                <Search />
              </div>
              <div className="w-[20%] flex justify-end">
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
