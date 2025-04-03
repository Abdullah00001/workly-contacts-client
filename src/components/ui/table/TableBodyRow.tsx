import { Dispatch, FC, MouseEvent, useState } from "react";
import { FaEdit, FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ITableBodyRowProps {
  email: string;
  phone: string;
  name: string;
  id: string;
  selectedContacts: string[];
  setSelectedContacts: Dispatch<React.SetStateAction<string[]>>;
}

const TableBodyRow: FC<ITableBodyRowProps> = ({
  email,
  phone,
  name,
  id,
  selectedContacts,
  setSelectedContacts,
}) => {
  const isSelected = selectedContacts.includes(id);
  const [isHover, setIsHover] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleSelect = (e: MouseEvent) => {
    e.stopPropagation();
    setSelectedContacts((prev) =>
      isSelected ? prev.filter((contactId) => contactId !== id) : [...prev, id]
    );
  };
  const handleFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  const handleEditClick = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(`/person/edit/${id}`, { state: { from: location.pathname } });
  };
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate(`/person/${id}`, { state: { from: location.pathname } });
  };
  return (
    <tr
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleDetails}
      className={`${isSelected && "bg-blue-300"} ${
        isSelected ? "hover:bg-blue-300" : "hover:bg-gray-300"
      }  cursor-pointer transition-all duration-300 ease-in-out`}
    >
      {/* For Laptop And Desktop Devices */}
      <td className="pl-3  py-2 hidden lg:block">
        <div className="flex items-center space-x-2">
          <div
            className="w-[40px] h-[40px] rounded-full cursor-pointer flex justify-center items-center  duration-300 ease-in-out"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {isSelected ? (
              <input
                checked={isSelected}
                onClick={handleSelect}
                type="checkbox"
                className="cursor-pointer w-5 h-5"
              />
            ) : isHover ? (
              <input
                checked={isSelected}
                onClick={handleSelect}
                type="checkbox"
                className="cursor-pointer w-5 h-5"
              />
            ) : (
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                alt="Avatar"
                className="w-10 h-10 cursor-pointer rounded-full"
              />
            )}
          </div>
          <div>{name}</div>
        </div>
      </td>
      <td className="pl-3  py-2 lg:hidden">
        <div className="flex items-center space-x-2">
          <div
            onClick={handleSelect}
            className={`w-[40px] h-[40px] rounded-full cursor-pointer flex justify-center items-center  duration-300 ease-in-out`}
          >
            {isSelected ? (
              <input
                checked={isSelected}
                onClick={handleSelect}
                name="selectCheckbox"
                type="checkbox"
                className="cursor-pointer w-5 h-5"
              />
            ) : (
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                alt="Avatar"
                className="w-10 h-10 cursor-pointer rounded-full"
              />
            )}
          </div>
          <div>{name}</div>
        </div>
      </td>
      <td className="hidden py-2  md:table-cell hover:underline hover:text-blue-500">
        {email}
      </td>
      <td className="hidden pr-4 py-2  lg:table-cell transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center">
          <span>{phone}</span>
          {isHover && (
            <div className="flex items-center space-x-2">
              <span
                className="ml-2 text-gray-600 cursor-pointer"
                onClick={handleEditClick}
              >
                <FaEdit size={20} />
              </span>
              {isFavorite ? (
                <span
                  className="ml-2 text-blue-600 cursor-pointer"
                  onClick={handleFavorite}
                >
                  <FaStar size={20} />
                </span>
              ) : (
                <span
                  onClick={handleFavorite}
                  className="ml-2 text-gray-600 cursor-pointer"
                >
                  <FaRegStar size={20} />
                </span>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableBodyRow;
