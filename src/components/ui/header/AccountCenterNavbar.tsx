import { HelpCircle, Users, X } from 'lucide-react';
import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AccountCenterNavItems } from '../../../constants/const';

const AccountCenterNavbar: FC = () => {
  const navigate = useNavigate();
  const handleHelpClick = () => {
    navigate('/help');
  };

  const handleCloseClick = () => {
    navigate('/');
  };
  return (
    <header className="sticky top-0 z-50 shadow-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
              <Users size={18} className=" text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Amar Contact
              </h1>
              <p className="text-sm text-gray-500 -mt-1">Contact Management</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <nav className="hidden min-[570px]:flex items-center space-x-4">
              {AccountCenterNavItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className=" font-medium text-white"
                >
                  {item.pathName}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center space-x-2 text-white">
              {/* Help Icon */}
              <button
                onClick={handleHelpClick}
                className="p-2 rounded-full "
                aria-label="Help"
              >
                <HelpCircle size={24} />
              </button>

              {/* Close Icon */}
              <button
                onClick={handleCloseClick}
                className="p-2 rounded-full"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex overflow-x-auto mt-4 min-[570px]:hidden items-center space-x-4">
          {AccountCenterNavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className=" font-medium text-white"
            >
              {item.pathName}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default AccountCenterNavbar;
