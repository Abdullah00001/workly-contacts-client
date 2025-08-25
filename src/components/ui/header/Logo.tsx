import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

const Logo: FC = () => {
  return (
    <div className="hidden md:block">
      <Link to={'/'}>
        <div className="flex items-center space-x-3 cursor-pointer group transition-all duration-300 hover:scale-105">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Workly Contacts
            </h1>
            <p className="text-sm text-gray-500 -mt-1">Contact Management</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
