'use client';

import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TDiscardModal } from '@/types/modal.type';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';

const DiscardModal: FC<TDiscardModal> = ({ open, onDiscard, onCancel }) => {
  return (
    <Dialog onOpenChange={onCancel} open={open} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You have unsaved changes</DialogTitle>
          <DialogDescription>
            Are you sure you want to discard your unsaved changes?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onDiscard}>Discard</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiscardModal;
