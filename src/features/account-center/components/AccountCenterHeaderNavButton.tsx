'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';

type AccountCenterHeaderNavButtonProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const AccountCenterHeaderNavButton: FC<AccountCenterHeaderNavButtonProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
        isActive ? 'bg-[#dde2e8]' : 'hover:bg-gray-50/15  '
      }`}
    >
      <Icon
        className={`w-5 h-5  ${isActive ? '!text-[#0a1317]' : '!text-white'}`}
      />
      <span
        className={`font-medium  ${isActive ? '!text-[#0a1317]' : '!text-white'}`}
      >
        {label}
      </span>
    </Link>
  );
};

export default AccountCenterHeaderNavButton;
