import { FC, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAvatarDropDown from '../../../hooks/useAvatarDropDownContext';
import { TGetProfileData } from '../../../interfaces/accountcenter.interface';
import { useQuery } from '@tanstack/react-query';
import AuthServices from '../../../services/auth.services';

const { processGetProfile } = AuthServices;

const Avatar: FC = () => {
  const [userData, setUserData] = useState<TGetProfileData>({
    avatar: {
      publicId: null,
      url: null,
    },
    email: null,
    name: null,
    phone: null,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleNavigateProfilePage = () => {
    setIsDropdownOpen(false);
    navigate('/accountscenter', { state: { from: location.pathname } });
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const { setIsFeedBackClicked, setIsLogoutClicked } = useAvatarDropDown();
  const { data, isPending, isFetching } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => await processGetProfile(),
  });
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
  useEffect(() => {
    if (isPending && isFetching) return;
    setUserData(data?.data);
  }, [data, isPending, isFetching]);
  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown}>
        {isPending && isFetching ? (
          <div className="w-[40px] h-[40px] rounded-full bg-gray-300 animate-pulse" />
        ) : (
          <img
            className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
            src={
              userData?.avatar?.url ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${userData?.name}`
            }
            alt={userData?.name as string}
          />
        )}
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 right-0 mt-2 w-[300px] bg-gray-200 shadow-lg rounded-md p-3">
          <div className="pb-2 border-b border-white">
            <h1 className="font-bold text-gray-800">{userData?.name}</h1>
          </div>
          <ul className="text-sm font-bold mt-2">
            <li
              onClick={handleNavigateProfilePage}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
            >
              Accounts Center
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
