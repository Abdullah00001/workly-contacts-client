'use client';
import TLayout from '@/types/layout.types';
import { FC } from 'react';
import { useSidebarStore } from '@/stores/sidebar-store';
import CreateContactSmallButton from '@/features/dashboard/components/CreateContactSmallButton';
import { usePathname } from 'next/navigation';
import ImportSnackBar from '@/components/common/ImportSnackBar';
import { useImportSnackbarStore } from '@/stores/import-sncakbar-store';

const DashboardContent: FC<TLayout> = ({ children }) => {
  const { openImportSnackbar } = useImportSnackbarStore();
  const { isOpen } = useSidebarStore();
  const pathName = usePathname();
  const isContactDetailsPage = pathName.startsWith('/person/');
  const isCreateContactPage = pathName.startsWith('/new');
  const isProfilePage = pathName.startsWith('/me');
  const isTrashPage = pathName.startsWith('/trash');
  return (
    <>
      {/* Mobile */}
      <main className="block md:hidden w-full flex-1">
        <div className="bg-[#ffffff] w-full h-[calc(100%-14px)] rounded-2xl overflow-auto">
          {children}
        </div>
        {openImportSnackbar && (
          <div className="fixed z-50 bottom-[6%] right-[3%] sm:bottom-[5%] sm:right-[28%]">
            <ImportSnackBar />
          </div>
        )}
        {!isContactDetailsPage &&
          !isCreateContactPage &&
          !isProfilePage &&
          !isTrashPage && (
            <div className="fixed block lg:hidden bottom-14 right-4">
              <CreateContactSmallButton />
            </div>
          )}
      </main>
      {/* Tablet */}
      <main className="hidden md:block lg:hidden md:w-full md:flex-1">
        <div className="bg-[#ffffff] w-full h-[calc(100%-48px)] rounded-2xl overflow-auto">
          {children}
        </div>
        {openImportSnackbar && (
          <div className="fixed bottom-[5%] right-[34%]">
            <ImportSnackBar />
          </div>
        )}
        {!isContactDetailsPage &&
          !isCreateContactPage &&
          !isProfilePage &&
          !isTrashPage && (
            <div className="fixed block lg:hidden bottom-14 right-4 md:left-[90%] md:top-[85%]">
              <CreateContactSmallButton />
            </div>
          )}
      </main>
      {/* Desktop */}
      <main
        className={`hidden md:hidden lg:block 
             transition-all duration-300
            ${isOpen ? 'w-[calc(100%-285px)]' : 'w-full ml-4'}
          `}
      >
        <div className="w-[calc(100%-16px)] h-[calc(100%-24px)] bg-[#ffffff] rounded-2xl overflow-auto">
          {children}
        </div>
        {openImportSnackbar && (
          <div className="fixed bottom-12 right-14 lg:bottom-10 lg:right-10">
            <ImportSnackBar />
          </div>
        )}
      </main>
    </>
  );
};

export default DashboardContent;
