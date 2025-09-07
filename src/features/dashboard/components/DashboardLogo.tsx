import { FC } from 'react';
import { Users } from 'lucide-react';
import Link from 'next/link';

const DashboardLogo: FC = () => {
  return (
    <div className="hidden md:block">
      <Link href={'/'} />
      <div className="flex items-center space-x-3 cursor-pointer ">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Workly Contacts
          </h1>
          <p className="text-xs text-gray-500 -mt-1">Contact Management</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLogo;
