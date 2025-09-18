'use client';

import { useImportExportModalStore } from '@/stores/import-export-modal-store';
import { type FC } from 'react';

const PrintModal: FC = () => {
  const { togglePrintModal } = useImportExportModalStore();
  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0"
    >
      <div className="bg-white rounded-[18px] w-[348px] px-6 py-5 shadow-lg ">
        <h2 className="text-[1.5rem] font-normal font-google-sans text-[#1f1f1f]">
          Print contacts
        </h2>
        <div className="mt-4 text-sm text-[#5f6368] font-google-sans">
          Your contacts will be formatted and sent to the printer. Please make
          sure your printer is connected.
        </div>
        <div className="flex justify-end items-center mt-6 gap-1">
          <button
            onClick={() => togglePrintModal()}
            className="text-[#0b57d0] px-4 py-2 rounded-[16px] cursor-pointer font-google-sans text-sm font-medium text-center hover:bg-[rgba(11,87,208,0.08)]"
          >
            Cancel
          </button>
          <button
            className={` px-4 py-2 rounded-[16px] font-google-sans text-sm font-medium text-center  hover:bg-[rgba(11,87,208,0.08)] text-[#0b57d0] cursor-pointer`}
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintModal;
