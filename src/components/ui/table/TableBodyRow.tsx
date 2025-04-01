import { FC, useState } from "react";
import { IContactInfo } from "../../../interfaces/contacts.interface";
import { FaEdit, FaStar, FaRegStar } from "react-icons/fa";

const TableBodyRow: FC<IContactInfo> = ({ email, phone, name }) => {
  const [isHover, setIsHover] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const handleEditClick = () => {
    // Handle edit action here
    console.log("Edit clicked");
  };

  return (
    <tr
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className=" hover:bg-gray-300 cursor-pointer transition-all duration-300 ease-in-out"
    >
      <td className="pl-3  py-2">
        <div className="flex items-center space-x-2">
          <div
            className="w-[40px] h-[40px] rounded-full cursor-pointer flex justify-center items-center  duration-300 ease-in-out"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {isHover ? (
              <input type="checkbox" className="cursor-pointer w-5 h-5" />
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
      <td className="hidden py-2  md:table-cell ">{email}</td>
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
              <span
                className="ml-2 text-gray-600 cursor-pointer"
                onClick={handleFavorite}
              >
                {isFavorite ? <FaStar size={20} /> : <FaRegStar size={20} />}
              </span>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableBodyRow;
