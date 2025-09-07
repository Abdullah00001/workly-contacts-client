'use client';
import TLayout from '@/types/layout.types';
import { FC } from 'react';
import DashboardSidebar from '@/features/dashboard/components/DashboardSidebar';
import { useSidebarStore } from '@/stores/sidebar-store';

const DashboardContent: FC<TLayout> = ({ children }) => {
  const { isOpen } = useSidebarStore();

  return (
    <div className="mt-5 h-[calc(100vh-5rem)]">
      <div className="flex h-full">
        {/* Sidebar */}
        <div
          className={`hidden lg:block
            lg:relative lg:transition-all lg:duration-300
            lg:bg-red-300
            ${isOpen ? 'lg:w-[22%] xl:w-[16%]' : 'lg:w-0'}
          `}
        >
          <div
            className={`
              absolute top-0 left-0 h-full w-[22vw] xl:w-[16vw] 
              transition-transform duration-300 
              ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <DashboardSidebar />
          </div>
        </div>

        {/* Content */}
        <div
          className={`w-full 
            bg-yellow-400 transition-all duration-300
            ${isOpen ? 'lg:w-[78%] xl:w-[84%]' : 'lg:w-full'}
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
