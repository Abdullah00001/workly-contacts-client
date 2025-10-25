'use client';
import { navItems } from '@/consts/const';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import Icon from '@/components/common/Icon';
import { useImportExportModalStore } from '@/stores/import-export-modal-store';

const DashboardSidebarNavigation: FC = () => {
  const pathname = usePathname();
  const { toggleImportModal } = useImportExportModalStore();
  return (
    <div className="flex flex-col mt-5">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        const { name, className, size, type, variant } = item.icon;
        return item.path ? (
          <Link
            key={item.path}
            href={item.path as string}
            className={`flex items-center font-bold font-google-sans-text justify-between px-4 py-3 rounded-full text-sm ${
              isActive
                ? 'bg-blue-100 text-[#001D35]'
                : 'text-[#444746] hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <Icon
                name={name}
                className={className}
                size={size}
                type={type}
                variant={variant}
              />
              <span>{item.pathName}</span>
            </div>
          </Link>
        ) : (
          <button
            key={item.pathName}
            onClick={() => {
              (item.pathName === 'Import' && toggleImportModal()) ||
                (() => {
                  return;
                });
            }}
            className={`flex items-center font-bold justify-between px-4 py-3 rounded-full text-sm cursor-pointer text-gray-700 hover:bg-gray-100`}
          >
            <div className="flex items-center gap-4">
              <Icon
                name={name}
                className={className}
                size={size}
                type={type}
                variant={variant}
              />
              <span>{item.pathName}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default DashboardSidebarNavigation;
