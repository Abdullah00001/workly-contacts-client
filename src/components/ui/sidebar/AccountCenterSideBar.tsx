import { Users } from 'lucide-react';
import { FC } from 'react';
import { AccountCenterNavItems } from '../../../constants/const';
import AccountCenterNavButton from '../button/AccountCenterNavButton';

const AccountCenterSideBar: FC = () => {
  return (
    <div className="w-full">
      <div className="mt-4">
        <div>
          <div className="flex items-center space-x-3 cursor-pointer group transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Workly Contacts
              </h1>
              <p className="text-sm text-gray-500 -mt-1">Contact Management</p>
            </div>
          </div>
        </div>
        <h2 className="font-bold text-[22px] mt-2">Account Center</h2>
        <h5 className="text-wrap mt-2 font-normal">
          Manage your personal info and account security to make Workly Contacts
          safer and more personalized for you.
        </h5>
      </div>
      <div className="mt-4">
        <div className="flex flex-col">
          {AccountCenterNavItems.map(({ icon, path, pathName }) => (
            <AccountCenterNavButton
              key={pathName}
              icon={icon}
              path={path}
              pathName={pathName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountCenterSideBar;
