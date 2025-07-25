import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { IAccountCenterNavItem } from '../../../constants/const';

const AccountCenterNavButton: FC<IAccountCenterNavItem> = ({
  icon,
  path,
  pathName,
}) => {
  const IconComponent = icon;
  return (
    <NavLink
      to={path} end
      className={({ isActive }) =>
        `flex items-center font-bold rounded-[14px] justify-between px-4 py-3 transition-all duration-100 text-sm ${
          isActive
            ? 'bg-[#dde2e8] text-[#0a1317]'
            : 'text-white hover:bg-gray-50/15  '
        }`
      }
    >
      <div className="flex items-center gap-4">
        <IconComponent size={24} />
        <span className="text-[15px] font-medium">{pathName}</span>
      </div>
    </NavLink>
  );
};

export default AccountCenterNavButton;
