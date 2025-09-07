import { Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <Link href={'/'}>
      <div className="flex items-center space-x-3 cursor-pointer group">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
          <Users className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
        </div>
        <div>
          <h1 className="text-sm sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Workly Contacts
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 -mt-1">
            Contact Management
          </p>
        </div>
      </div>
    </Link>
  );
}
