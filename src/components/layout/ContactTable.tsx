import { FC, useState } from "react";
import { IContactInfo } from "../../interfaces/contacts.interface";
import TableBodyRow from "../ui/table/TableBodyRow";
import { FaChevronDown, FaMinusSquare, FaTrash } from "react-icons/fa";
interface ContactTableProps {
  contactData: IContactInfo[] | [];
}

const ContactTable: FC<ContactTableProps> = ({ contactData }) => {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const handleSelectAll = () => {
    setSelectedContacts(contactData.map(({ id }) => id));
  };
  const handleSelectNone = () => {
    setSelectedContacts([]);
  };
  return (
    <div className="w-full overflow-y-scroll">
      <table className="w-full table-fixed">
        <thead>
          {selectedContacts.length > 0 ? (
            <tr className="border-gray-600 border-b">
              <th className="text-[16px] font-semibold text-left pl-3 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {/* Minus Square Icon */}
                    <FaMinusSquare className="w-5 h-5 text-blue-600" />

                    {/* Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setIsDropdown(!isDropdown)}
                        className="text-blue-600 flex items-center space-x-1"
                      >
                        <span>{selectedContacts.length} selected</span>
                        <FaChevronDown className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {isDropdown && (
                        <div className="absolute mt-2 bg-white border rounded-lg shadow-md w-20">
                          <button
                            onClick={handleSelectAll}
                            className="w-full text-left px-2 py-1 hover:bg-gray-100"
                          >
                            All
                          </button>
                          <button
                            onClick={handleSelectNone}
                            className="w-full text-left px-2 py-1 hover:bg-gray-100"
                          >
                            None
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="block md:hidden">
                    <FaTrash size={15} />
                  </div>
                </div>
              </th>
              <th className="text-[16px] font-semibold text-left py-4 hidden md:table-cell"></th>
              <th className="text-[16px] font-semibold text-left py-4 hidden lg:table-cell "></th>
            </tr>
          ) : (
            <tr className="border-gray-600 border-b">
              <th className="text-[16px] font-semibold text-left pl-3 py-4">
                Name
              </th>
              <th className="text-[16px] font-semibold text-left py-4 hidden md:table-cell">
                Email
              </th>
              <th className="text-[16px] font-semibold text-left py-4 hidden lg:table-cell ">
                Phone
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
          {contactData?.map(({ email, id, name, phone }: IContactInfo) => (
            <TableBodyRow
              selectedContacts={selectedContacts}
              key={id}
              email={email}
              name={name}
              phone={phone}
              id={id}
              setSelectedContacts={setSelectedContacts}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
