'use client';

import { FC, useState } from 'react';
import Hamburger from '@/features/dashboard/components/Hamburger';
import DashboardLogo from '@/features/dashboard/components/DashboardLogo';
import DashboardSearch from '@/features/dashboard/components/DashboardSearch';
import NavUser from '@/features/dashboard/components/NavUser';
import { CircleQuestionMark, Menu, Search, X } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebar-store';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const DashboardHeader: FC = () => {
  const router = useRouter();
  const { toggle } = useSidebarStore();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header>
      {/* Mobile */}
      <div className="block md:hidden lg:hidden w-full p-1">
        <div className="flex items-center justify-between relative min-h-[40px]">
          <AnimatePresence>
            <motion.div
              animate={{ opacity: isSearchExpanded ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <Hamburger />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence>
            {isSearchExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="absolute left-0 right-0 flex items-center px-1"
              >
                <motion.div
                  className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer mr-2 flex-shrink-0"
                  onClick={handleSearchToggle}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <X className="text-[#5f6368]" />
                </motion.div>
                <div className="flex-1">
                  <DashboardSearch
                    isExpanded={true}
                    onClose={handleSearchToggle}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!isSearchExpanded && (
              <motion.div
                animate={{ opacity: isSearchExpanded ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="flex justify-end items-center gap-3 flex-shrink-0"
              >
                <motion.div
                  className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
                  onClick={handleSearchToggle}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <Search className="text-[#5f6368]" />
                </motion.div>
                <div
                  onClick={() => {
                    handleNavigation('/help');
                  }}
                  className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
                >
                  <CircleQuestionMark className="text-[#5f6368]" />
                </div>
                <NavUser />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Tablet */}
      <div className="hidden md:block lg:hidden p-2 w-full">
        <div className="flex items-center justify-start">
          <div className="w-[240px] flex justify-start items-center space-x-2">
            <div className="flex w-[48px] transition-normal h-[48px] items-center justify-center hover:bg-gray-200 hover:rounded-[50%] cursor-pointer">
              <Hamburger />
            </div>
            <DashboardLogo />
          </div>
          <div className="w-[calc(100%-485px)] flex-1">
            <DashboardSearch />
          </div>
          <div className="w-[160px] flex justify-end items-center gap-3">
            <div
              onClick={() => {
                handleNavigation('/help');
              }}
              className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
            >
              <CircleQuestionMark className="text-[#5f6368]" />
            </div>
            <NavUser />
          </div>
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden lg:block w-full p-2">
        <div className="flex items-center justify-start">
          <div className="w-[285px] flex justify-start items-center space-x-2">
            <div className="flex w-[48px] transition-normal h-[48px] items-center justify-center hover:bg-gray-200 hover:rounded-[50%] cursor-pointer">
              <button className="cursor-pointer" onClick={() => toggle()}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
            <DashboardLogo />
          </div>
          <div className="w-[calc(100%-485px)] flex-1">
            <DashboardSearch />
          </div>
          <div className="w-[200px] flex items-center justify-end gap-3">
            <div
              onClick={() => {
                handleNavigation('/help');
              }}
              className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:rounded-[50%]"
            >
              <CircleQuestionMark className="text-[#5f6368]" />
            </div>
            <NavUser />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
