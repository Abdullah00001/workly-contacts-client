'use client';
import { navItems } from '@/consts/const';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

const DashboardSidebarNavigation: FC = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col mt-5">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        const Icon = item.icon;
        return item.path ? (
          <Link
            key={item.path}
            href={item.path as string}
            className={`flex items-center font-bold justify-between px-4 py-3 rounded-full text-sm ${
              isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <Icon className="w-7 h-7 font-bold" />
              <span>{item.pathName}</span>
            </div>
          </Link>
        ) : (
          <button
            key={item.path}
            className={`flex items-center font-bold justify-between px-4 py-3 rounded-full text-sm cursor-pointer text-gray-700 hover:bg-gray-100`}
          >
            <div className="flex items-center gap-4">
              <Icon className="w-7 h-7 font-bold" />
              <span>{item.pathName}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default DashboardSidebarNavigation;
