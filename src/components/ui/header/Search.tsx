import { FC, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";

const Search: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect tablet devices based on screen width
  useEffect(() => {
    const checkIfTablet = () => {
      // Common tablet breakpoint (768px and above, but less than desktop)
      setIsTablet(window.innerWidth >= 768);
    };

    // Check on initial load
    checkIfTablet();

    // Add resize listener
    window.addEventListener("resize", checkIfTablet);
    return () => window.removeEventListener("resize", checkIfTablet);
  }, []);

  // Close search bar when clicking outside (only for mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen && !isTablet) {
      document.addEventListener("mousedown", handleClickOutside);
      inputRef.current?.focus(); // Auto-focus when opening
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isTablet]);

  // Focus on input when tablet mode is active
  useEffect(() => {
    if (isTablet && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTablet]);

  // For tablet devices, always show the full search bar
  if (isTablet) {
    return (
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
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className="w-full border-none outline-none px-3 py-2 text-lg"
          />
        </div>
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="p-2"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
    );
  }

  // For mobile: collapsible search
  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            ref={searchRef}
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: "12rem", opacity: 1 }}
            exit={{ width: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center bg-white shadow-md rounded-lg border border-gray-300 overflow-hidden"
          >
            <div className="relative flex-grow flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                className="w-full border-none outline-none px-3 py-1 text-lg pr-8"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2"
              aria-label="Close search"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="p-2"
            aria-label="Open search"
          >
            <SearchIcon className="w-6 h-6 text-gray-700" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
