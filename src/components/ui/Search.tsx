import { FC, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";

const Search: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      inputRef.current?.focus(); // Auto-focus when opening
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
            <button onClick={() => setIsOpen(false)} className="p-2">
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
          >
            <SearchIcon className="w-6 h-6 text-gray-700" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
