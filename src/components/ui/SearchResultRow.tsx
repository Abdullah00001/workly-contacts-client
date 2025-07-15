import { FC } from 'react';
import { ISearchResult } from '../../interfaces/contacts.interface';
import { useNavigate } from 'react-router-dom';

const SearchResultRow: FC<ISearchResult> = ({
  _id,
  avatar,
  email,
  name,
  onResultClick,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/person/${_id}`);
    onResultClick();
  };
  const avatarUrl = avatar?.url
    ? avatar?.url
    : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
  return (
    <div
      onClick={handleClick}
      className="flex items-center hover:bg-gray-100 gap-3 md:gap-4 p-2 md:p-3 transition rounded-md cursor-pointer"
    >
      <img
        src={avatarUrl}
        alt={name}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shrink-0"
      />
      <div className="flex flex-col md:flex-row md:items-center md:space-x-2 min-w-0 flex-1">
        <span className="text-sm md:text-base font-medium text-foreground truncate">
          {name}
        </span>
        <span className="hidden md:block text-gray-400">•</span>
        <span className="text-xs md:text-sm text-muted-foreground truncate">
          {email}
        </span>
      </div>
    </div>
  );
};

export default SearchResultRow;
