'use client';
import { FC } from 'react';
import {
  AccountCenterHeaderNavItems,
  TAccountCenterHeaderSheetProps,
} from '../types/const.types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';

const AccountCenterHeaderSheet: FC<TAccountCenterHeaderSheetProps> = ({
  isSheetOpen,
  setSheetOpen,
}) => {
  const router = useRouter();
  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className=" bg-[#152127] [&>button]:text-white">
        <SheetHeader>
          <SheetTitle className="!text-white font-bold text-[22px]">
            AccountCenter
          </SheetTitle>
          <SheetDescription className="!text-white text-wrap text-[16px]">
            Manage your personal info and account security to make Workly
            Contacts safer and more personalized for you.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-2">
          {AccountCenterHeaderNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left"
              >
                <Icon className="w-5 h-5 !text-white" />
                <span className="!text-white font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccountCenterHeaderSheet;
