import { FC } from "react";
import { IContactInfo } from "../../interfaces/contacts.interface";
import TableBodyRow from "../ui/table/TableBodyRow";

interface ContactTableProps {
  contactData: IContactInfo[] | [];
}

const ContactTable: FC<ContactTableProps> = ({ contactData }) => {
  return (
    <div className="w-full overflow-y-scroll">
      <table className="w-full table-fixed">
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
          <tr>
            <td className="py-2"></td>
            <td className="hidden py-2  md:table-cell"></td>
            <td className="py-2 hidden lg:table-cell"></td>
          </tr>
          {contactData?.map(
            ({ email, id, name, phone, avatarUrl, jobTitle }: IContactInfo) => (
              <TableBodyRow
                key={id}
                email={email}
                name={name}
                phone={phone}
                avatarUrl={avatarUrl}
                jobTitle={jobTitle}
                id={id}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
