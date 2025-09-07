'use client';
import TLayout from '@/types/layout.types';
import { FC } from 'react';
import { useSidebarStore } from '@/stores/sidebar-store';

const DashboardContent: FC<TLayout> = ({ children }) => {
  const { isOpen } = useSidebarStore();

  return (
    <main
      className={`w-full 
            bg-yellow-400 transition-all duration-300
            ${isOpen ? 'lg:w-[78%] xl:w-[84%]' : 'lg:w-full'}
          `}
    >
      {children}
    </main>
  );
};

export default DashboardContent;
