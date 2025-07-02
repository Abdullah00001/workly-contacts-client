import { FC, useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaMinusSquare, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { TTrashContact } from '../../interfaces/contacts.interface';
import MultiDeleteModal from '../ui/modal/MultiDeleteModal';
import TrashTableBodyRow from '../ui/table/TrashTableBodyRow';

interface TrashTableProps {
  contactData: TTrashContact[];
}

const TrashTable: FC<TrashTableProps> = ({ contactData }) => {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [contacts, setContacts] = useState<TTrashContact[] | []>([]);
  const handleSelectAll = () => {
    setSelectedContacts(contacts.map(({ _id }) => _id as string));
    setIsDropdown(false);
  };

  const handleSelectNone = () => {
    setSelectedContacts([]);
    setIsDropdown(false);
  };

  const handleDelete = () => {
    setIsDelete(!isDelete);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    setContacts(contactData);
  }, [contactData]);
  return (
    <div className="w-full overflow-y-scroll relative">
      <table className="w-full">
        <thead>
          {selectedContacts.length > 0 ? (
            <tr className="border-gray-600 border-b">
              <th className="text-[16px] font-semibold text-left pl-3 py-4">
                <div className="flex justify-between items-center relative">
                  <div className="flex items-center space-x-2">
                    <FaMinusSquare className="w-5 h-5 text-blue-600" />

                    {/* Dropdown Trigger */}
                    <button
                      onClick={() => setIsDropdown((prev) => !prev)}
                      className="text-blue-600 flex items-center space-x-1 transition-all duration-300 hover:text-blue-700 cursor-pointer"
                    >
                      <span>{selectedContacts.length} selected</span>
                      <FaChevronDown className="w-4 h-4 transition-transform duration-300 " />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          ref={dropdownRef}
                          className="absolute left-24 mt-27 bg-white border rounded-lg shadow-lg w-32 z-50"
                        >
                          <button
                            onClick={handleSelectAll}
                            className="w-full text-left px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                          >
                            Select All
                          </button>
                          <button
                            onClick={handleSelectNone}
                            className="w-full text-left px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                          >
                            Select None
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div
                    onClick={handleDelete}
                    className="block pr-3 md:hidden cursor-pointer"
                  >
                    <FaTrash size={15} />
                  </div>
                </div>
              </th>
              <th className="text-[16px] font-semibold text-left py-4 hidden md:table-cell">
                <div className="flex justify-end items-center">
                  <div
                    onClick={handleDelete}
                    className="hidden md:block pr-3 lg:hidden cursor-pointer"
                  >
                    <FaTrash size={15} />
                  </div>
                </div>
              </th>
              <th className="text-[16px] font-semibold text-left py-4 hidden lg:table-cell">
                <div className="flex justify-end items-center space-x-3">
                  <button className="cursor-pointer" onClick={handleDelete}>
                    Delete forever
                  </button>
                  <button className="pr-3 cursor-pointer">Recover</button>
                </div>
              </th>
            </tr>
          ) : (
            <tr className="border-gray-600 border-b">
              <th className="text-[16px] font-semibold text-left pl-3 py-4">
                Name
              </th>
              <th className="text-[16px] font-semibold text-center py-4 hidden lg:table-cell">
                Date deleted
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          <tr>
            <td className="py-2"></td>
            <td className="hidden py-2  md:table-cell"></td>
            <td className="py-2 hidden lg:table-cell"></td>
          </tr>
          {contacts.map(({ _id, name, avatar, trashedAt }) => (
            <TrashTableBodyRow
              key={_id}
              selectedContacts={selectedContacts}
              avatar={avatar}
              name={name}
              trashedAt={trashedAt}
              id={_id as string}
              setSelectedContacts={setSelectedContacts}
            />
          ))}
        </tbody>
      </table>
      {isDelete && (
        <MultiDeleteModal
          setContacts={setContacts}
          handleIsDelete={handleDelete}
          selectedItems={selectedContacts}
          setSelectedContacts={setSelectedContacts}
        />
      )}
    </div>
  );
};

export default TrashTable;
