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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TMultiExportModal } from '../types/type';
import Icon from '@/components/common/Icon';
import { useMutation } from '@tanstack/react-query';
import { ExportContacts } from '../services/contacts-service';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { exportToCSV, exportToJSON, exportToVCard } from '../helper/helper';

type TExportType = 'csv' | 'vcard' | 'json';

const MultiExportModal: FC<TMultiExportModal> = ({
  allContacts,
  multiExportModalOpen,
  selectedContacts,
  setMultiExportModalOpen,
  setSelectContact,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<TExportType>('csv');
  const hasSelectedContacts = selectedContacts.length > 0;
  const [exportOption, setExportOption] = useState<'selected' | 'all'>(
    hasSelectedContacts ? 'selected' : 'all'
  );
  const selectFormat = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFormat(e.target.value as TExportType);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: string[]) => ExportContacts(payload),
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

        toast.success(`Contacts exported as ${selectedFormat.toUpperCase()}`, {
          closeButton: false,
          position: 'bottom-center',
        });

        // Close modal and reset selection
        setMultiExportModalOpen(false);
        setSelectContact([]);
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
    const contactsToExport =
      exportOption === 'selected' ? selectedContacts : allContacts;

    if (contactsToExport.length === 0) {
      toast.error('No contacts to print');
      return;
    }

    mutate(contactsToExport);
  };
  useEffect(() => {
    if (isPending) {
      toast('Working...', { closeButton: false, position: 'bottom-center' });
    }
  }, [isPending]);
  useEffect(() => {
    if (multiExportModalOpen) {
      setExportOption(hasSelectedContacts ? 'selected' : 'all');
    }
  }, [multiExportModalOpen, hasSelectedContacts]);
  return (
    <Dialog
      modal={true}
      open={multiExportModalOpen}
      onOpenChange={setMultiExportModalOpen}
    >
      <DialogContent className="bg-white rounded-[18px] w-[348px] px-6 py-5 shadow-lg ">
        <DialogHeader>
          <DialogTitle className="text-[1.5rem] font-normal font-google-sans text-[#1f1f1f]">
            Export contacts
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full rounded-t-[6px] cursor-pointer flex justify-between items-center bg-[#e1e3e1] border-b-black border-b">
            <div className="pl-3 text-[#444746] font-google-sans-text">
              {exportOption === 'selected'
                ? `Selected contacts (${selectedContacts.length})`
                : `Contacts (${allContacts.length})`}
            </div>
            <div className="h-[56px] flex justify-center items-center">
              <Icon
                name="arrow_drop_down"
                size={24}
                type="icons"
                variant="filled"
                className="mx-3 text-[#444746]"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] !rounded-none !p-0">
            <DropdownMenuItem
              onSelect={() => setExportOption('selected')}
              disabled={!hasSelectedContacts}
              className={`!text-[#000000] cursor-pointer !rounded-none hover:!bg-[#e1e3e1] !text-[16px] font-google-sans-text !p-3 ${exportOption === 'selected' && '!bg-[#e1e3e1]'}`}
            >
              Selected contacts {`(${selectedContacts.length})`}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setExportOption('all')}
              className={`!text-[#000000] cursor-pointer !rounded-none hover:!bg-[#e1e3e1] !text-[16px] font-google-sans-text !p-3 ${exportOption === 'all' && '!bg-[#e1e3e1]'}`}
            >
              Contacts {`(${allContacts.length})`}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="mt-2">
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

export default MultiExportModal;
