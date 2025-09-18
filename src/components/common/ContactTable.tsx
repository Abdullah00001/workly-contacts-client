'use client';
import type { FC } from 'react';
import Icon from '@/components/common/Icon';
import { useImportExportModalStore } from '@/stores/import-export-modal-store';

type TContacts = {
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
        <div className="flex flex-col gap-2 w-full mt-2">
          {contacts.map(({ avatar, email, name, objectId, phone }) => (
            <div
              key={objectId}
              className="flex rounded-sm px-2 gap-2 items-center justify-start hover:bg-[#f5f5f5] cursor-pointer"
            >
              <div className="flex-1 flex gap-5 items-center justify-start">
                <div className="w-9 h-9 flex items-center justify-center">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="w-9 h-9 cursor-pointer rounded-full"
                    />
                  ) : (
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                      alt="Avatar"
                      className="w-9 h-9 cursor-pointer rounded-full"
                    />
                  )}
                </div>
                <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal">
                  {name}
                </div>
              </div>
              <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden sm:block">
                {email}
              </div>
              <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden phone-field-md phone-field-lg">
                {phone}
              </div>
              <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden job-field-lg"></div>
              <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden address-field-lg"></div>
              <div className="flex-1 w-[170px] hidden sm:block">
                <div className="flex item-center justify-end">
                  <div className="w-[45px] h-[45px] flex items-center justify-center hover:!bg-[#f5f5f5] cursor-pointer rounded-full">
                    <Icon
                      name="star_outline"
                      variant="outlined"
                      className=" text-[#444746]"
                      type="icons"
                      size={20}
                    />
                  </div>
                  <div className="w-[45px] h-[45px] flex items-center justify-center">
                    <Icon
                      name="edit"
                      variant="outlined"
                      className=" text-[#444746]"
                      type="icons"
                      size={20}
                    />
                  </div>
                  <div className="w-[45px] h-[45px] flex items-center justify-center">
                    <Icon
                      name="more_vert"
                      variant="outlined"
                      className=" text-[#444746]"
                      type="icons"
                      size={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactTable;
