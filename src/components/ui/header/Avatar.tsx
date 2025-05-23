import { FC, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAvatarDropDown from '../../../hooks/useAvatarDropDownContext';

interface User {
  name: string;
  avatarUrl?: string;
}

const Avatar: FC = () => {
  const user: User = {
    name: 'Jane Doe',
    avatarUrl:
      'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww',
  };
  const fallbackAvatarUrl = 'https://via.placeholder.com/150?text=No+Avatar';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleNavigateProfilePage = () => {
    setIsDropdownOpen(false);
    navigate('/me', { state: { from: location.pathname } });
  };
  
  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const { setIsFeedBackClicked, setIsLogoutClicked } = useAvatarDropDown();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown}>
        <img
          className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
          src={user.avatarUrl || fallbackAvatarUrl}
          alt={user.name}
        />
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-3">
          <div className="pb-2 border-b border-gray-200">
            <h1 className="font-bold text-gray-800">{user.name}</h1>
          </div>
          <ul className="text-sm font-bold mt-2">
            <li
              onClick={handleNavigateProfilePage}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
            >
              Profile
            </li>
            <li
              onClick={() => {
                setIsFeedBackClicked(true);
                setIsDropdownOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
            >
              Feedback
            </li>
            <li
              onClick={() => {
                setIsLogoutClicked(true);
                setIsDropdownOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Avatar;
