import { FC, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowLeft, Users } from 'lucide-react';
import {
  AiOutlineContacts,
  AiOutlineStar,
  AiOutlineDelete,
} from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  {
    path: '/',
    pathName: 'Contacts',
    icon: <AiOutlineContacts className="w-5 h-5" />,
  },
  {
    path: '/favorite',
    pathName: 'Favorite',
    icon: <AiOutlineStar className="w-5 h-5" />,
  },
  {
    path: '/trash',
    pathName: 'Trash',
    icon: <AiOutlineDelete className="w-5 h-5" />,
  },
];

const Hamburger: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement>(null);

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
              className="fixed top-0 left-0 h-full w-[70%] md:w-[40%] sm:w-[70%] bg-white shadow-lg p-4 z-50"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-4">
                <Link to={'/'}>
                  <div className="flex items-center space-x-2 cursor-pointer group transition-all duration-300 hover:scale-105">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate">
                        Workly Contacts
                      </h1>
                      <p className="text-xs text-gray-500 -mt-0.5 truncate">
                        Contact Management
                      </p>
                    </div>
                  </div>
                </Link>
                <button onClick={() => setIsOpen(false)}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Navigation */}
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-2 font-medium ${
                          isActive
                            ? 'bg-blue-500 font-bold rounded-[8px] text-white'
                            : 'hover:bg-gray-200'
                        }`
                      }
                    >
                      {item.icon}
                      {item.pathName}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hamburger;
