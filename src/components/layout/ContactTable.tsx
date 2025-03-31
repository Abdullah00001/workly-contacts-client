import { FC } from "react";
import { IContactInfo } from "../../interfaces/contacts.interface";

interface ContactTableProps {
  contactData: IContactInfo[] | [];
}

const ContactTable: FC<ContactTableProps> = ({ contactData }) => {
  return (
    <div className="w-full overflow-y-scroll">
      <table className="w-full">
        <thead>
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
        </thead>
        <tbody>
          {contactData?.map((data: IContactInfo) => (
            <tr>
              <td className="pl-3">
                <div className="flex items-center space-x-2">
                  <div>
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div>{data.name}</div>
                </div>
              </td>
              <td className="hidden md:table-cell">{data.email}</td>
              <td className="hidden lg:table-cell">{data.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
