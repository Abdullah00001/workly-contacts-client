import { FC, useState } from "react";
import { IContactInfo } from "../../../interfaces/contacts.interface";

const TableBodyRow: FC<IContactInfo> = ({ email, phone, name }) => {
  const [isAvatarHover, setIsAvatarHover] = useState(false);
  return (
    <tr className=" hover:bg-gray-300 cursor-pointer">
      <td className="pl-3  py-2">
        <div className="flex items-center space-x-2">
          <div
            className="w-[40px] h-[40px] rounded-full cursor-pointer flex justify-center items-center  duration-300 ease-in-out"
            onMouseEnter={() => setIsAvatarHover(true)}
            onMouseLeave={() => setIsAvatarHover(false)}
          >
            {isAvatarHover ? (
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
      <td className="hidden py-2  lg:table-cell">{phone}</td>
    </tr>
  );
};

export default TableBodyRow;
