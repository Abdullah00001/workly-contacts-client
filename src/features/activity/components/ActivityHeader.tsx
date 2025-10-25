'use client';
import NavUser from '@/features/dashboard/components/NavUser';
import { CircleQuestionMark, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ActivityHeader() {
  const router = useRouter();
  return (
    <div className="w-full px-2 lg:px-4 py-2 bg-[#152127]">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href={'/'}>
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
              <Users className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Workly Contacts
              </h1>
              <p className="text-xs sm:text-sm text-gray-200 -mt-1">
                Contact Management
              </p>
            </div>
          </div>
        </Link>
        <div className="flex justify-end items-center gap-3">
          <div
            onClick={() => router.push('/help')}
            className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
          >
            <CircleQuestionMark className="text-white" />
          </div>
          <NavUser />
        </div>
      </div>
    </div>
  );
}
