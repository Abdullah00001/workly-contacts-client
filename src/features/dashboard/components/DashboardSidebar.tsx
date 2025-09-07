'use client';
import { useSidebarStore } from '@/stores/sidebar-store';
import { FC } from 'react';
import DashboardSidebarContent from '@/features/dashboard/components/DashboardSidebarContent';

const DashboardSidebar: FC = () => {
  const { isOpen } = useSidebarStore();
  return (
    <aside
      className={`hidden lg:block
            lg:relative lg:transition-all lg:duration-300 overflow-hidden
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
        <DashboardSidebarContent />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
