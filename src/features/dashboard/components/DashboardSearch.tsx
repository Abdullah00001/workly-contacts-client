'use client';

import { FC, useState, useEffect, useRef, ChangeEvent } from 'react';
import { Search, X } from 'lucide-react';

// Mock data for demonstration
const mockSearchResults = [
  {
    _id: '1',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    email: 'john.doe@example.com',
    name: 'John Doe',
  },
  {
    _id: '2',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
  },
  {
    _id: '3',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    email: 'mike.johnson@example.com',
    name: 'Mike Johnson',
  },
];

// Mock SearchResultRow component
const SearchResultRow: FC<{
  _id: string;
  avatar: string;
  email: string;
  name: string;
  onResultClick: () => void;
}> = ({ _id, avatar, email, name, onResultClick }) => {
  return (
    <div
      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
      onClick={onResultClick}
    >
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full mr-3 object-cover"
      />
      <div className="flex-grow">
        <div className="font-medium text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{email}</div>
      </div>
    </div>
  );
};

const DashboardSearch: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchedData, setSearchedData] = useState<any[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);

    // Simple mock search logic for UI demonstration
    if (value.trim()) {
      const filtered = mockSearchResults.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase())
      );
      setSearchedData(filtered);
      setShowResults(true);
    } else {
      setSearchedData([]);
      setShowResults(false);
    }
  };

  const handleSearchResultClick = () => {
    setSearchText('');
    setShowResults(false);
    setIsOpen(false);
  };

  // Detect tablet devices based on screen width
  useEffect(() => {
    const checkIfTablet = () => {
      // Common tablet breakpoint (768px and above, but less than desktop)
      setIsTablet(window.innerWidth >= 768);
    };

    // Check on initial load
    checkIfTablet();

    // Add resize listener
    window.addEventListener('resize', checkIfTablet);
    return () => window.removeEventListener('resize', checkIfTablet);
  }, []);

  // outside click search result hide functionality
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        // Hide search results on all devices
        setShowResults(false);

        // Only close the search bar on mobile devices
        if (!isTablet) {
          setIsOpen(false);
        }
      }
    };

    // Add event listener for all devices when search is open or results are shown
    if (isOpen || showResults) {
      document.addEventListener('click', handleClickOutside);

      // Auto-focus when opening on mobile
      if (isOpen && !isTablet) {
        inputRef.current?.focus();
      }
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, isTablet, showResults]);

  // Focus on input when tablet mode is active
  useEffect(() => {
    if (isTablet && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTablet]);

  // For tablet devices, always show the full search bar
  if (isTablet) {
    return (
      <div className="relative w-full" ref={searchRef}>
        <div className="flex items-center bg-white shadow-md rounded-lg border border-gray-300 w-full ">
          <div className="flex-grow flex items-center w-full">
            <Search className="ml-3 w-5 h-5 text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              value={searchText}
              onChange={handleChange}
              placeholder="Search..."
              className="w-full border-none outline-none px-3 py-2 text-lg"
            />
          </div>
          {searchText && (
            <button
              onClick={() => {
                setSearchText('');
                setShowResults(false);
              }}
              className="p-2"
              aria-label="Clear search"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
        {/* Search Results */}
        {showResults && searchText && searchedData.length > 0 && (
          <div className="absolute top-full left-0 w-full max-h-[50vh] overflow-y-auto bg-white border border-t-0 border-gray-300 shadow-md rounded-b-lg z-10">
            {searchedData.map(({ _id, avatar, email, name }) => (
              <SearchResultRow
                onResultClick={handleSearchResultClick}
                key={_id}
                _id={_id}
                avatar={avatar}
                email={email}
                name={name}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // For mobile: collapsible search
  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="flex items-center bg-white shadow-md rounded-lg border border-gray-300 w-full">
        <div className="flex-grow flex items-center w-full">
          <Search className="ml-3 w-5 h-5 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            value={searchText}
            onChange={handleChange}
            placeholder="Search..."
            className="w-full border-none outline-none px-3 py-2 text-lg"
          />
        </div>
        {searchText && (
          <button
            onClick={() => {
              setSearchText('');
              setIsOpen(false);
              setShowResults(false);
            }}
            className="p-2"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
      {/* Search Results */}
      {searchText && searchedData.length > 0 && showResults && (
        <div className="absolute top-full left-0 w-full max-h-[50vh] overflow-y-auto bg-white border border-t-0 border-gray-300 shadow-md rounded-b-lg z-10">
          {searchedData.map(({ _id, avatar, email, name }) => (
            <SearchResultRow
              onResultClick={handleSearchResultClick}
              key={_id}
              _id={_id}
              avatar={avatar}
              email={email}
              name={name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardSearch;
