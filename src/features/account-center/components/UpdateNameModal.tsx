'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC, useEffect, useState } from 'react';
import { TUpdateNameModalProps } from '../types/personal-info-types';
const UpdateNameModal: FC<TUpdateNameModalProps> = ({
  isUpdateNameModalOpen,
  name,
  setIsUpdateNameModalOpen,
}) => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    setUserName(name ?? '');
  }, [name]);
  return (
    <Dialog
      open={isUpdateNameModalOpen}
      onOpenChange={setIsUpdateNameModalOpen}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Edit Name</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              value={userName}
              id="name"
              name="name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateNameModal;
