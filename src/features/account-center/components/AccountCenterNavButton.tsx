'use client';
import Link from 'next/link';
import { FC } from 'react';
import { TAccountCenterNavItem } from '../types/const.types';
import { usePathname } from 'next/navigation';

const AccountCenterNavButton: FC<TAccountCenterNavItem> = ({
  icon,
  path,
  pathName,
}) => {
  const IconComponent = icon;
  const pathname = usePathname();
  const isActive = pathname === path;
  return (
    <Link
      href={path}
      className={`flex items-center font-bold rounded-[14px] justify-between px-4 py-3 transition-all duration-100 text-sm ${
        isActive
          ? 'bg-[#dde2e8] text-[#0a1317]'
          : 'text-white hover:bg-gray-50/15  '
      }`}
    >
      <div className="flex items-center gap-4">
        <IconComponent size={24} />
        <span className="text-[15px] font-medium">{pathName}</span>
      </div>
    </Link>
  );
};

export default AccountCenterNavButton;
