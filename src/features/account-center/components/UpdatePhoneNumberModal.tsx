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
import { TUpdatePhoneNumberModalProps } from '../types/personal-info-types';
const UpdatePhoneNumberModal: FC<TUpdatePhoneNumberModalProps> = ({
  isUpdatePhoneModalOpen,
  phone,
  setIsUpdatePhoneModalOpen,
}) => {
  const [userPhone, setUserPhone] = useState<string>('');

  useEffect(() => {
    setUserPhone(phone ?? '');
  }, [phone]);
  return (
    <Dialog
      open={isUpdatePhoneModalOpen}
      onOpenChange={setIsUpdatePhoneModalOpen}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Edit Phone</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone</Label>
            <Input
              value={userPhone}
              id="phone"
              name="phone"
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="Add your phone number"
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

export default UpdatePhoneNumberModal;
