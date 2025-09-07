'use client';
import { useSidebarStore } from '@/stores/sidebar-store';
import { FC } from 'react';

const DashboardSidebar: FC = () => {
  const { isOpen } = useSidebarStore();
  return (
    <aside
      className={`hidden lg:block
            lg:relative lg:transition-all lg:duration-300 overflow-hidden
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
        <div className="flex flex-1 flex-col gap-4 p-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
