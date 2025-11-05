import { FC } from 'react';
import CreateContactButton from '@/features/dashboard/components/CreateContactButton';
import DashboardSidebarNavigation from '@/features/dashboard/components/DashboardSidebarNavigation';
import DashboardSidebarLabel from './DashboardSidebarLabel';

/**
 * This Component Is For Dashboard Sidebar Content Layout.That How Will The Contents Will Be View In Ui.
 **/
const DashboardSidebarContent: FC = () => {
  return (
    <div className="h-full w-full px-4 flex flex-col">
      <div className="w-full sticky top-0 bg-[#f7fafc] z-10">
        <CreateContactButton />
      </div>
      <div className="w-full flex-1 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent hover:scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full pb-8">
        <DashboardSidebarNavigation />
        <DashboardSidebarLabel />
      </div>
    </div>
  );
};

export default DashboardSidebarContent;
