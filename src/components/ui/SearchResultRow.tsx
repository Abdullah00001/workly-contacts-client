// components/ui/SearchResultRow.tsx
import { FC, useEffect } from 'react';
import { ISearchResult } from '../../interfaces/contacts.interface';


const SearchResultRow: FC<ISearchResult> = ({ _id, avatar, email, name }) => {
  const avatarUrl = avatar?.url
    ? avatar?.url
    : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
  useEffect(() => {
    console.log(name);
  }, [_id]);
  return (
    <div className="flex items-center gap-4 p-3 hover:bg-muted/50 transition rounded-md cursor-pointer">
      <img
        src={avatarUrl}
        alt={name}
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{email}</span>
      </div>
    </div>
  );
};

export default SearchResultRow;
