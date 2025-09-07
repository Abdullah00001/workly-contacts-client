import DashboardContent from '@/features/dashboard/components/DashboardContent';
import DashboardHeader from '@/features/dashboard/components/DashboardHeader';
import DashboardSidebar from '@/features/dashboard/components/DashboardSidebar';
import TLayout from '@/types/layout.types';

export default function DashboardLayout({ children }: TLayout) {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-white">
      <DashboardHeader />
      <div className="mt-5 h-[calc(100vh-5rem)]">
        <div className="flex h-[calc(100vh-5rem)]">
          <DashboardSidebar />
          <DashboardContent>{children}</DashboardContent>
        </div>
      </div>
    </div>
  );
}
