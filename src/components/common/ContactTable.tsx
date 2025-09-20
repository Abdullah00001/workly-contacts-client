'use client';
import { useState, type FC } from 'react';
import Icon from '@/components/common/Icon';
import { useImportExportModalStore } from '@/stores/import-export-modal-store';
import ContactTableRow from '@/components/common/ContactTableRow';

export type TContacts = {
  objectId: string;
  name: string;
  email: string | null;
  phone: string;
  avatar: string | null;
};

type TContactTableProps = {
  contacts: TContacts[];
};

const ContactTable: FC<TContactTableProps> = ({ contacts }) => {
  const { toggleExportModal, togglePrintModal } = useImportExportModalStore();
  const [selectedContacts, setSelectContact] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-2">
      <div className="sticky top-0 py-2 bg-white pb-2 flex items-center justify-start gap-2 w-full border-b border-b-[#c4c7c5]">
        <div className="flex-1 text-sm font-google-sans-text font-medium text-[#444746] pl-2">
          Name
        </div>
        <div className="flex-1 font-google-sans-text text-sm font-medium text-[#444746] hidden sm:block">
          Email
        </div>
        <div className="flex-1 text-sm font-google-sans-text font-medium text-[#444746] hidden phone-field-md phone-field-lg">
          Phone
        </div>
        <div className="flex-1 text-sm font-google-sans-text font-medium text-[#444746] hidden job-field-lg">
          Job Title & Company
        </div>
        <div className="flex-1 text-sm font-google-sans-text font-medium text-[#444746] hidden address-field-lg">
          Address
        </div>
        <div className="flex-1 flex items-center justify-end">
          <button
            onClick={() => togglePrintModal()}
            className="w-[45px] h-[45px] flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer rounded-full"
          >
            <Icon
              name="print"
              variant="filled"
              className="text-[#444746]"
              size={20}
              type="icons"
            />
          </button>
          <button
            onClick={() => toggleExportModal()}
            className="w-[45px] h-[45px] flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer rounded-full"
          >
            <Icon
              name="file_upload"
              variant="outlined"
              className=" text-[#444746]"
              size={20}
              type="icons"
            />
          </button>
        </div>
      </div>
      <div className="w-full pb-2">
        <div className="py-[10px] pl-[10px] w-full">
          <h1 className="text-xs font-medium font-google-sans-text text-[#444746]">
            Contacts
          </h1>
        </div>
        <div className="flex flex-col w-full gap-1 mt-2">
          {contacts.map((contact) => (
            <ContactTableRow key={contact.objectId} selectedContacts={selectedContacts} setSelectContact={setSelectContact} contact={contact} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactTable;
