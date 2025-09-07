'use client';
import TLayout from '@/types/layout.types';
import { FC } from 'react';
import { useSidebarStore } from '@/stores/sidebar-store';
import CreateContactSmallButton from '@/features/dashboard/components/CreateContactSmallButton';
import { usePathname } from 'next/navigation';

const DashboardContent: FC<TLayout> = ({ children }) => {
  const { isOpen } = useSidebarStore();
  const pathName = usePathname();
  const isContactDetailsPage = pathName.startsWith('/person/');
  const isCreateContactPage = pathName.startsWith('/new');
  const isProfilePage = pathName.startsWith('/me');
  return (
    <main
      className={`w-full 
            bg-yellow-400 transition-all duration-300
            ${isOpen ? 'lg:w-[78%] xl:w-[84%]' : 'lg:w-full'}
          `}
    >
      {children}
      {!isContactDetailsPage && !isCreateContactPage && !isProfilePage && (
        <div className="fixed block lg:hidden bottom-14 right-4 md:left-[90%] md:top-[85%]">
          <CreateContactSmallButton />
        </div>
      )}
    </main>
  );
};

export default DashboardContent;
