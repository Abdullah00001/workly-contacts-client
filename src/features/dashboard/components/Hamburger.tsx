'use client';
import { FC, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowLeft, Users } from 'lucide-react';
import { navItems } from '@/consts/const';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Hamburger: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="p-2 flex items-center justify-between">
        <button onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Drawer with AnimatePresence for smooth exit animation */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              ref={drawerRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[250px] md:w-[300px]  bg-white shadow-lg p-4 z-50"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-4">
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

              {/* Drawer Navigation */}
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  const Icon = item.icon;
                  return item.path ? (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={`flex items-center gap-2 p-2 font-medium ${
                          isActive
                            ? 'bg-blue-500 font-bold rounded-[8px] text-white'
                            : 'hover:bg-gray-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.pathName}
                      </Link>
                    </li>
                  ) : (
                    <li key={item.path}>
                      <button
                        className={`flex items-center gap-2 p-2 font-medium ${
                          isActive
                            ? 'bg-blue-500 font-bold rounded-[8px] text-white'
                            : 'hover:bg-gray-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.pathName}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hamburger;
