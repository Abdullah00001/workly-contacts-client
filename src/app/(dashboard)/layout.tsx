import DashboardHeader from '@/features/dashboard/components/DashboardHeader';
import DashboardContent from '@/features/dashboard/components/DashboardContent';
import TLayout from '@/types/layout.types';

export default function DashboardLayout({ children }: TLayout) {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-white">
      <DashboardHeader />
      <DashboardContent>{children}</DashboardContent>
    </div>
  );
}
