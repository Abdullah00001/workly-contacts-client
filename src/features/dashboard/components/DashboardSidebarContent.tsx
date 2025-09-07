import { FC } from 'react';
import CreateContactButton from '@/features/dashboard/components/CreateContactButton';
import DashboardSidebarNavigation from '@/features/dashboard/components/DashboardSidebarNavigation';

const DashboardSidebarContent: FC = () => {
  return (
    <div className="px-4">
      <CreateContactButton />
      <DashboardSidebarNavigation />
    </div>
  );
};

export default DashboardSidebarContent;
