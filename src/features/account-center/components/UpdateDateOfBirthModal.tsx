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
import { TUpdateDateOfBirthModalProps } from '../types/personal-info-types';
const UpdateDateOfBirthModal: FC<TUpdateDateOfBirthModalProps> = ({
  isUpdateDateOfBirthModalOpen,
  dateOfBirth,
  setIsUpdateDateOfBirthModalOpen,
}) => {
  const [userDob, setUserDob] = useState<string>('');
  useEffect(() => {
    setUserDob(dateOfBirth ?? '');
  }, [dateOfBirth]);
  return (
    <Dialog
      open={isUpdateDateOfBirthModalOpen}
      onOpenChange={setIsUpdateDateOfBirthModalOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Date of Birth</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="dob">DateOfBirth</Label>
            <Input
              id="dob"
              type="date"
              name="dob"
              onChange={(e) => setUserDob(e.target.value)}
              value={userDob}
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

export default UpdateDateOfBirthModal;
