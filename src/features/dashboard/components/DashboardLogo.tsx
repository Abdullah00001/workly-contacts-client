import { FC } from 'react';
import { Users } from 'lucide-react';
import Link from 'next/link';

const DashboardLogo: FC = () => {
  return (
    <div>
      {/* tablet */}
      <Link href={'/dashboard'} className="hidden md:block lg:hidden">
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
      {/* desktop */}
      <Link href={'/dashboard'} className="hidden lg:block">
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
  );
};

export default DashboardLogo;
