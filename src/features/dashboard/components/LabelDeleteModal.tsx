'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FC, useState, useEffect } from 'react';
import { TLabelDeleteModal } from '../types/type';

const LabelDeleteModal: FC<TLabelDeleteModal> = ({
  _id,
  mutate,
  open,
  setOpen,
}) => {
  const [options, setOptions] = useState<'all' | 'label'>('label');
  const handleDelete = () => {
    mutate({ _id, withContacts: options === 'all' });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogContent className='bg-[#e9eef6] rounded-3xl'>
        <DialogHeader>
          <DialogTitle className="font-google-sans font-normal text-[24px] text-[#1f1f1f]">
            Delete this label
          </DialogTitle>
          <DialogDescription className="font-google-sans-text text-sm text-[#444746]">
            This label has 1 contact. Choose what to do with it.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex justify-start items-center gap-2">
            <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${
                  options === 'label'
                    ? 'hover:bg-blue-100'
                    : 'hover:bg-[#1f1f1f14]'
                }`}
              >
                <input
                  className="w-5 h-5 cursor-pointer"
                  type="radio"
                  name="label"
                  id={'label'}
                  value={'label'}
                  checked={options === 'label'}
                  onChange={() => setOptions('label')}
                />
              </div>
            </div>
            <label
              htmlFor="label"
              className="cursor-pointer font-google-sans text-[16px] text-[#1f1f1f]"
            >
              Keep all contacts and delete this label
            </label>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${
                  options === 'all'
                    ? 'hover:bg-blue-100'
                    : 'hover:bg-[#1f1f1f14]'
                }`}
              >
                <input
                  className="w-5 h-5 cursor-pointer"
                  type="radio"
                  name="all"
                  id={'all'}
                  value={'all'}
                  checked={options === 'all'}
                  onChange={() => setOptions('all')}
                />
              </div>
            </div>
            <label
              htmlFor="all"
              className="cursor-pointer font-google-sans text-[16px] text-[#1f1f1f]"
            >
              Delete all contacts and delete this label
            </label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button className="text-[#0b57d0] px-4 py-2 rounded-[16px] cursor-pointer font-google-sans text-sm font-medium text-center hover:bg-[rgba(11,87,208,0.08)]">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDelete();
            }}
            className={`px-4 py-2 rounded-[16px]  font-google-sans text-sm font-medium text-center cursor-pointer text-[#0b57d0] hover:bg-[rgba(11,87,208,0.08)]`}
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LabelDeleteModal;
