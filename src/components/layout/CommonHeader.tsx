import { Users } from 'lucide-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const CommonHeader: FC = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={handleLogoClick}
            className="flex items-center space-x-3 cursor-pointer group transition-all duration-300 hover:scale-105"
          >
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
        </div>
      </div>
    </header>
  );
};

export default CommonHeader;
