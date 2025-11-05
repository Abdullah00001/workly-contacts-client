import ActivityFooter from '@/features/activity/components/ActivityFooter';
import ActivityHeader from '@/features/activity/components/ActivityHeader';
import ActivityPageTitle from '@/features/activity/components/ActivityPageTitle';
import ProtectedGuard from '@/features/auth/components/ProtectedGuard';
import TLayout from '@/types/layout.types';

export default function ActivityLayout({ children }: TLayout) {
  return (
    <ProtectedGuard>
      <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#152127] text-white">
        <div className="h-[60px]">
          <ActivityHeader />
        </div>
        <div className="h-[65px]">
          <ActivityPageTitle />
        </div>
        <main className="w-full h-[calc(100vh-221px)] lg:h-[calc(100vh-189px)]">
          {children}
        </main>
        <div className="lg:h-[64px] h-[96px]">
          <ActivityFooter />
        </div>
      </div>
    </ProtectedGuard>
  );
}
