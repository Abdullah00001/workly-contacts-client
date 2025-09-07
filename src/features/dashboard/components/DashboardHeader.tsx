'use client';

import { FC } from 'react';
import Hamburger from '@/features/dashboard/components/Hamburger';
import DashboardLogo from '@/features/dashboard/components/DashboardLogo';
import DashboardSearch from '@/features/dashboard/components/DashboardSearch';
import NavUser from '@/features/dashboard/components/NavUser';
import { Menu } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebar-store';

const DashboardHeader: FC = () => {
  const { toggle } = useSidebarStore();

  return (
    <section>
      {/* Mobile And Tablet */}
      <div className="w-full p-2 md:px-4 md:py-2">
        <div className="block md:hidden">
          <div className="flex items-center justify-between md:hidden">
            <div className="w-[20%] flex justify-start items-center space-x-2">
              <div>
                <Hamburger />
              </div>
              <div>
                <DashboardLogo />
              </div>
            </div>
            <div className="w-[60%]">
              <DashboardSearch />
            </div>
            <div className="w-[20%] flex justify-end">
              <NavUser />
            </div>
          </div>
        </div>
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            <div className="w-[40%] lg:w-[30%] flex justify-start items-center space-x-2">
              <div className="hidden lg:block ">
                <button onClick={() => toggle()} className="lg:cursor-pointer">
                  <Menu className="w-6 h-6" />
                </button>
              </div>
              <div className="md:block lg:hidden">
                <Hamburger />
              </div>
              <div>
                <DashboardLogo />
              </div>
            </div>
            <div className="w-[60%] flex lg:w-[70%] lg:justify-between md:justify-end items-center">
              <div className="w-[80%]">
                <DashboardSearch />
              </div>
              <div className="w-[20%] flex justify-end">
                <NavUser />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;
