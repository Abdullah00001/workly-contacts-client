import AccountCenterHeader from '@/features/account-center/components/AccountCenterHeader';
import AccountCenterSideBar from '@/features/account-center/components/AccountCenterSidebar';
import ProtectedGuard from '@/features/auth/components/ProtectedGuard';
import ModalHolders from '@/features/dashboard/components/ModalHolders';
import TLayout from '@/types/layout.types';
import { X } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: TLayout) {
  return (
    <ProtectedGuard>
      <div>
        <div className="hidden lg:block fixed inset-0 w-screen h-screen overflow-hidden bg-[#152127] text-white">
          <div className="max-w-[1068px] lg:px-5  mx-auto h-screen">
            <div className="flex h-full">
              <aside className="w-[32%] border-r-[1px] border-gray-500 h-full pr-[32px]">
                <AccountCenterSideBar />
              </aside>
              <main className="w-[68%] pl-[34px] h-full overflow-y-auto scrollbar-hide">
                <div className="mt-15">{children}</div>
              </main>
            </div>
          </div>
          <div className="absolute cursor-pointer top-5 left-[90%] lg:left-[95%]">
            <Link href={'/'}>
              <X size={28} className="text-white" />
            </Link>
          </div>
        </div>
        {/* Tablet And Mobile Device Layout */}
        <div className="block lg:hidden text-white bg-[#152127] min-h-screen">
          <header className="sticky top-0 z-50 bg-[#152127]">
            <AccountCenterHeader/>
          </header>
          <main className="overflow-y-auto">{children}</main>
        </div>
        <ModalHolders />
      </div>
    </ProtectedGuard>
  );
}
