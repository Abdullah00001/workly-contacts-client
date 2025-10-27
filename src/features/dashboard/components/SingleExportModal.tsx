'use client';

import { ChangeEvent, useEffect, useState, type FC } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TSingleExportModal } from '../types/type';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { exportToCSV, exportToJSON, exportToVCard } from '../helper/helper';
import { ExportSingleContacts } from '../services/contacts-service';
import { useMutation } from '@tanstack/react-query';

type TExportType = 'csv' | 'vcard' | 'json';

const SingleExportModal: FC<TSingleExportModal> = ({
  contactId,
  setSingleExportModalOpen,
  singleExportModalOpen,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<TExportType>('csv');
  const selectFormat = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFormat(e.target.value as TExportType);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: string) => ExportSingleContacts(payload),
    onSuccess: (data) => {
      try {
        switch (selectedFormat) {
          case 'csv':
            exportToCSV(data);
            break;
          case 'vcard':
            exportToVCard(data);
            break;
          case 'json':
            exportToJSON(data);
            break;
        }

        toast.success(`Contact exported as ${selectedFormat.toUpperCase()}`, {
          closeButton: false,
          position: 'bottom-center',
        });

        // Close modal and reset selection
        setSingleExportModalOpen(false);
      } catch (error) {
        console.log(error)
        toast.error('Failed to export contacts', {
          closeButton: false,
          position: 'bottom-center',
        });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const err = error.response?.data;
        toast(err, { closeButton: false, position: 'bottom-center' });
        return;
      }
      toast('Unknown error occurred, Try Again!', {
        closeButton: false,
        position: 'bottom-center',
      });
    },
  });
  const handleExport = () => {
    mutate(contactId);
  };
  useEffect(() => {
    if (isPending) {
      toast('Working...', { closeButton: false, position: 'bottom-center' });
    }
  }, [isPending]);
  return (
    <Dialog
      modal={true}
      open={singleExportModalOpen}
      onOpenChange={setSingleExportModalOpen}
    >
      <DialogContent className="bg-white rounded-[18px] w-[348px] px-6 py-5 shadow-lg ">
        <DialogHeader>
          <DialogTitle className="text-[1.5rem] font-normal font-google-sans text-[#1f1f1f]">
            Export contacts
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>
          <p className="font-medium text-xs font-google-sans-text text-[#444746]">
            Export as
          </p>
          <div className="flex flex-col mt-4">
            {(['csv', 'vcard', 'json'] as TExportType[]).map((format) => (
              <div
                key={format}
                className=" cursor-pointer flex items-center justify-start gap-2"
              >
                <div
                  className={`w-[40px] flex items-center justify-center h-[40px] rounded-full  ${
                    selectedFormat === format
                      ? 'hover:bg-blue-100'
                      : 'hover:bg-[#1f1f1f14]'
                  }`}
                >
                  <input
                    className="w-5 h-5 cursor-pointer"
                    type="radio"
                    name="exportFormat"
                    id={format}
                    value={format}
                    checked={selectedFormat === format}
                    onChange={selectFormat}
                  />
                </div>
                <label
                  className=" cursor-pointer font-google-sans text-[#1f1f1f] text-[1rem]"
                  htmlFor={format}
                >
                  {format.toUpperCase()}
                </label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button className="text-[#0b57d0] px-4 py-2 rounded-[16px] cursor-pointer font-google-sans text-sm font-medium text-center hover:bg-[rgba(11,87,208,0.08)]">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleExport}
            className={` px-4 py-2 rounded-[16px] font-google-sans text-sm font-medium text-center  hover:bg-[rgba(11,87,208,0.08)] text-[#0b57d0] cursor-pointer`}
          >
            Export
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SingleExportModal;
