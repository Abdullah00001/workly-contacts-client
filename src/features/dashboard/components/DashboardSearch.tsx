'use client';

import { type FC, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type DashboardSearchProps = {
  isExpanded?: boolean;
  onClose?: () => void;
};

const DashboardSearch: FC<DashboardSearchProps> = ({ isExpanded, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);
  return (
    <>
      {/* Mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="block md:hidden lg:hidden w-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1], // Custom easing for smooth animation
            }}
          >
            <motion.div
              className="w-full"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <input
                ref={inputRef}
                className="w-full px-4 py-2 outline-none rounded-[8px] bg-[#f1f3f4] text-sm"
                type="text"
                name="search"
                id="mobile-search"
                placeholder="Search"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Tablet */}
      <div className="hidden md:flex lg:hidden md:justify-start md:items-center md:w-full">
        <div className="flex-1 flex items-center relative">
          <div className="absolute left-4 flex items-center justify-center p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <input
            className="px-[14px] w-[85%] outline-none py-3 rounded-[8px] bg-[#f1f3f4] pl-15"
            type="text"
            name="search"
            id="search"
            placeholder="Search"
          />
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden md:hidden lg:flex lg:justify-start lg:items-center lg:w-full">
        <div className="flex-1 flex items-center relative">
          <div className="absolute left-4 flex items-center justify-center p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <input
            className="px-[14px] w-[80%] max-w-[724px] outline-none py-3 rounded-[8px] bg-[#f1f3f4] pl-15"
            type="text"
            name="search"
            id="search"
            placeholder="Search"
          />
        </div>
      </div>
    </>
  );
};

export default DashboardSearch;
