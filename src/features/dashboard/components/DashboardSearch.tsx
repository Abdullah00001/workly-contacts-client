'use client';

import { type FC, useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchContact } from '@/features/dashboard/services/contacts-service';
import { TSearchUser } from '../types/type';
import SearchResultItem from './SearchResultItem';
import { useMutation } from '@tanstack/react-query';
import { getAvatarUrl } from '../helper/helper';

type DashboardSearchProps = {
  isExpanded?: boolean;
  onClose?: () => void;
};

const DashboardSearch: FC<DashboardSearchProps> = ({ isExpanded, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const {
    mutate: performSearch,
    data: searchResults = [],
    isPending: isLoading,
  } = useMutation({
    mutationFn: async (query: string) => {
      if (query.trim() === '') {
        return [];
      }
      return await SearchContact(query);
    },
    onSuccess: (results) => {
      setShowResults(results.length > 0);
    },
    onError: (error) => {
      console.error('Search error:', error);
      setShowResults(false);
    },
  });
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    if (showResults) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showResults]);
  // 🕒 Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // 🚀 Perform search only when debouncedQuery updates
  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setShowResults(false);
      return;
    }
    performSearch(debouncedQuery);
  }, [debouncedQuery]);
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
              <div className="relative" ref={containerRef}>
                <input
                  ref={inputRef}
                  className="w-full px-4 py-2 outline-none rounded-[8px] bg-[#f1f3f4] text-sm"
                  type="text"
                  name="search"
                  id="mobile-search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <AnimatePresence>
                  {showResults && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
                    >
                      {(searchResults as TSearchUser[]).map((user) => (
                        <SearchResultItem
                          key={user._id}
                          setSearchQuery={setSearchQuery}
                          setShowResults={setShowResults}
                          user={user}
                          getAvatarUrl={getAvatarUrl}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Tablet */}
      <div className="hidden md:flex lg:hidden md:justify-start md:items-center md:w-full">
        <div className="flex-1 flex items-center relative">
          <div className="absolute z-50 left-4 flex items-center justify-center p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <div className="relative w-[85%]" ref={containerRef}>
            <input
              className="px-[14px] w-full outline-none py-3 rounded-[8px] bg-[#f1f3f4] pl-15"
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
                >
                  {(searchResults as TSearchUser[]).map((user) => (
                    <SearchResultItem
                      key={user._id}
                      setSearchQuery={setSearchQuery}
                      setShowResults={setShowResults}
                      user={user}
                      getAvatarUrl={getAvatarUrl}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden md:hidden lg:flex lg:justify-start lg:items-center lg:w-full">
        <div className="flex-1 flex items-center relative">
          <div className="absolute z-50 left-4 flex items-center justify-center p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <div className="relative w-[80%] max-w-[724px]" ref={containerRef}>
            <input
              className="px-[14px] w-full outline-none py-3 rounded-[8px] bg-[#f1f3f4] pl-15"
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
                >
                  {(searchResults as TSearchUser[]).map((user) => (
                    <SearchResultItem
                      key={user._id}
                      setSearchQuery={setSearchQuery}
                      setShowResults={setShowResults}
                      user={user}
                      getAvatarUrl={getAvatarUrl}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSearch;
