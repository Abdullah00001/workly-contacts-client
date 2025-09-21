'use client';
import { useState, type FC } from 'react';
import Icon from '@/components/common/Icon';
import { useImportExportModalStore } from '@/stores/import-export-modal-store';
import ContactTableRow from '@/components/common/ContactTableRow';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const handleSelectAll = () => {
    setSelectContact(contacts.map(({ objectId }) => objectId as string));
  };

  const handleSelectNone = () => {
    setSelectContact([]);
  };
  return (
    <div className="flex flex-col gap-2">
      {selectedContacts.length > 0 ? (
        <div
          className={`sticky top-0 h-[50px]  bg-white  flex items-center justify-between w-full border-b border-b-[#c4c7c5]`}
        >
          <div className={`pl-[9px] flex items-center justify-start`}>
            <button
              onClick={handleSelectNone}
              className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#0b57d030]"
            >
              <Icon
                name={
                  selectedContacts.length === contacts.length
                    ? 'check_box'
                    : 'indeterminate_check_box'
                }
                className={`text-[#0b57d0]`}
                size={24}
                type="icons"
                variant="filled"
              />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-center items-center w-7 h-7 rounded-full cursor-pointer hover:bg-[#0b57d030]">
                <Icon
                  name={'arrow_drop_down'}
                  className={`text-[#0b57d0]`}
                  size={25}
                  type="icons"
                  variant="filled"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[130px] ml-[70px] lg:ml-[110px] bg-white border border-gray-200  shadow-lg  px-0 rounded-none py-2">
                <DropdownMenuItem
                  onClick={handleSelectAll}
                  className="w-full text-left px-4 py-2 text-[16px] !text-[#1F1F1F] hover:!bg-gray-200 cursor-pointer rounded-none"
                >
                  All
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSelectNone}
                  className="w-full  text-left px-4 py-2 text-[16px] !text-[#1F1F1F] hover:!bg-gray-200 cursor-pointer rounded-none"
                >
                  None
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center justify-start gap-1 text-[#0b57d0] font-medium font-google-sans-text text-sm">
              <span className="font-medium">{selectedContacts.length}</span>
              <span className="font-medium">selected</span>
            </div>
          </div>
          <div className={`flex items-center justify-end`}>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center justify-center w-[45px] h-[45px] cursor-pointer rounded-full hover:bg-[#0b57d030]`}
              >
                <Icon
                  name="label"
                  className={`text-[#0b57d0]`}
                  size={20}
                  type="icons"
                  variant="outlined"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={`w-[200px]  overflow-y-auto mr-[30px] lg:mr-[110px] bg-white border border-gray-200  shadow-lg  px-0 rounded-none py-2`}
              >
                <h5 className="px-4 w-full text-[#1f1f1f] text-sm font-google-sans-text">
                  Manage Labels
                </h5>
                <div className="mt-1 max-h-[220px] w-full overflow-y-auto">
                  {[
                    'hello',
                    'hi',
                    'bye',
                    'go',
                    'next',
                    'nest',
                    'django',
                    'node',
                    'express',
                  ].map((item) => (
                    <DropdownMenuItem
                      key={item}
                      className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 !rounded-none flex items-center gap-4 cursor-pointer"
                    >
                      <Icon
                        name="label"
                        variant="outlined"
                        className=" text-[#444746]"
                        size={22}
                        type="symbols"
                      />
                      {item}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`w-[45px] h-[45px] flex items-center justify-center  cursor-pointer rounded-full hover:bg-[#0b57d030]`}
              >
                <Icon
                  name={'more_vert'}
                  variant="outlined"
                  className={`text-[#0b57d0]`}
                  type="icons"
                  size={20}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={`w-[180px] mr-8 lg:mr-[50px] bg-white border border-gray-200  shadow-lg  px-0 rounded-none py-2`}
              >
                <DropdownMenuItem className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer rounded-none">
                  <Icon
                    name="print"
                    variant="filled"
                    className="text-[#444746]"
                    size={22}
                    type="icons"
                  />
                  Print
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer rounded-none">
                  <Icon
                    name="file_upload"
                    variant="outlined"
                    className=" text-[#444746]"
                    size={22}
                    type="icons"
                  />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer rounded-none">
                  <Icon
                    name="delete"
                    variant="outlined"
                    className=" text-[#444746]"
                    size={22}
                    type="symbols"
                  />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <div className="sticky top-0  h-[50px]  bg-white  flex items-center justify-start gap-2 w-full border-b border-b-[#c4c7c5]">
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
      )}
      <div className="w-full pb-2">
        <div className="py-[10px] pl-[10px] w-full">
          <h1 className="text-xs font-medium font-google-sans-text text-[#444746]">
            Contacts
          </h1>
        </div>
        <div className="flex flex-col w-full gap-1 mt-2">
          {contacts.map((contact) => (
            <ContactTableRow
              key={contact.objectId}
              selectedContacts={selectedContacts}
              setSelectContact={setSelectContact}
              contact={contact}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactTable;
