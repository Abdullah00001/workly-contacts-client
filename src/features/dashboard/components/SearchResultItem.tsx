'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { TSearchResultItemProps } from '../types/type';
import { useRouter } from 'next/navigation';

const SearchResultItem: FC<TSearchResultItemProps> = ({
  user,
  getAvatarUrl,
  setSearchQuery,
  setShowResults,
}) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={() => {
        setShowResults(false);
        setSearchQuery('');
        router.push(`/person/${user._id}`);
      }}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors border-b last:border-b-0"
    >
      <img
        src={getAvatarUrl(user) || '/placeholder.svg'}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-gray-900 truncate">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>
    </motion.div>
  );
};

export default SearchResultItem;
