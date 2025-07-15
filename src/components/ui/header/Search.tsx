import { FC, useState, useEffect, useRef, ChangeEvent } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import ContactServices from '../../../services/contacts.services';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ISearchResult } from '../../../interfaces/contacts.interface';
import SearchResultRow from '../SearchResultRow';

const { processSearchContact } = ContactServices;

const Search: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchedData, setSearchedData] = useState<ISearchResult[] | []>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const { mutate, data, isPending } = useMutation({
    mutationFn: async (payload: string) => await processSearchContact(payload),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          'Search query failed. Please try again.'
      );
    },
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
    mutate(value);
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
  // out side click search result hide functionality
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
  useEffect(() => {
    if (!data || isPending) {
      setSearchedData([]);
      return;
    }
    setShowResults(true);
    setSearchedData(data?.data);
  }, [data, isPending]);
  useEffect(() => {}, [searchedData]);

  // For tablet devices, always show the full search bar
  if (isTablet) {
    return (
      <div className="relative w-full" ref={searchRef}>
        <div
          ref={searchRef}
          className="flex items-center bg-white shadow-md rounded-lg border border-gray-300 w-full "
        >
          <div className="flex-grow flex items-center w-full">
            <SearchIcon className="ml-3 w-5 h-5 text-gray-500" />
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
          <SearchIcon className="ml-3 w-5 h-5 text-gray-500" />
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

export default Search;
