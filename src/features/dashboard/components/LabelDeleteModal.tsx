'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import type { FC, useState, useEffect } from 'react';
import { TLabelDeleteModal } from '../types/type';

const LabelDeleteModal: FC<TLabelDeleteModal> = ({
  _id,
  mutate,
  open,
  setOpen,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogHeader>Delete this label</DialogHeader>
          <DialogDescription>
            This label has 1 contact. Choose what to do with it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button className="text-[#0b57d0] px-4 py-2 rounded-[16px] cursor-pointer font-google-sans text-sm font-medium text-center hover:bg-[rgba(11,87,208,0.08)]">
              Cancel
            </button>
          </DialogClose>
          <button
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
