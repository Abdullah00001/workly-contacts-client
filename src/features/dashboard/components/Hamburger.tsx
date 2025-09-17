'use client';
import { FC, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Users } from 'lucide-react';
import { navItems } from '@/consts/const';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/common/Icon';
import DashboardSidebarLabel from './DashboardSidebarLabel';
import { useHamburgerStore } from '@/stores/hamburger-store';
import { useImportExportModalStore } from '@/stores/import-export-modal-store';

const Hamburger: FC = () => {
  const { isHamburgerOpen, setHamburgerOpen } = useHamburgerStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { toggleImportModal } = useImportExportModalStore();
  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setHamburgerOpen(false);
      }
    };

    if (isHamburgerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isHamburgerOpen]);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="p-2 flex items-center justify-between">
        <button onClick={() => setHamburgerOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Drawer with AnimatePresence for smooth exit animation */}
      <AnimatePresence>
        {isHamburgerOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setHamburgerOpen(false)}
          >
            <motion.div
              ref={drawerRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[290px] md:w-[300px]  bg-white shadow-lg p-4 z-50"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
            >
              <div className="h-full w-full flex flex-col">
                {/* Drawer Header */}
                <div className="flex items-center justify-between w-full sticky top-0 z-10 mb-4">
                  <Link href={'/dashboard'}>
                    <div className="flex items-center space-x-3 cursor-pointer ">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-[22px] font-normal bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          Contacts
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent hover:scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full">
                  {/* Drawer Navigation */}
                  <ul className="space-y-2">
                    {navItems.map((item) => {
                      const isActive = pathname === item.path;
                      const { name, className, size, type, variant } =
                        item.icon;
                      return item.path ? (
                        <li key={item.path}>
                          <Link
                            href={item.path}
                            className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold font-google-sans-text  ${
                              isActive
                                ? 'bg-[#c2e7ff] rounded-[8px] text-[#001D35]'
                                : 'text-[#444746]'
                            }`}
                          >
                            <Icon
                              name={name}
                              className={isActive ? '#001d35' : className}
                              size={size}
                              type={type}
                              variant={variant}
                            />
                            {item.pathName}
                          </Link>
                        </li>
                      ) : (
                        <li
                          onClick={() => {
                            (item.pathName === 'Import' &&
                              toggleImportModal()) ||
                              (() => {
                                return;
                              });
                          }}
                          key={item.pathName}
                        >
                          <button
                            className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold font-google-sans-text ${
                              isActive
                                ? 'bg-[#c2e7ff] rounded-[8px] text-[#001D35]'
                                : 'text-[#444746]'
                            }`}
                          >
                            <Icon
                              name={name}
                              className={isActive ? '#001d35' : className}
                              size={size}
                              type={type}
                              variant={variant}
                            />
                            {item.pathName}
                          </button>
                        </li>
                      );
                    })}
                    <DashboardSidebarLabel />
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hamburger;
