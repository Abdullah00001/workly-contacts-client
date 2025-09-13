import DashboardContent from '@/features/dashboard/components/DashboardContent';
import DashboardHeader from '@/features/dashboard/components/DashboardHeader';
import DashboardSidebar from '@/features/dashboard/components/DashboardSidebar';
import TLayout from '@/types/layout.types';

export default function DashboardLayout({ children }: TLayout) {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#f7fafc]">
      <DashboardHeader />
      <div className="mt-1 md:mt-3  w-full h-[calc(100%-64px)] flex">
        <DashboardSidebar />
        <DashboardContent>{children}</DashboardContent>
      </div>
    </div>
  );
}
