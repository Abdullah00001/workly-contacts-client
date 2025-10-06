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
import { TUpdateWorkAddressModalProps } from '../types/personal-info-types';
const UpdateWorkAddressModal: FC<TUpdateWorkAddressModalProps> = ({
  work,
  isUpdateWorkAddressModalOpen,
  setIsUpdateWorkAddressModalOpen,
}) => {
  const [userWorkAddress, setUserWorkAddress] = useState<string>('');

  useEffect(() => {
    setUserWorkAddress(work ?? '');
  }, [work]);
  return (
    <Dialog
      open={isUpdateWorkAddressModalOpen}
      onOpenChange={setIsUpdateWorkAddressModalOpen}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Edit WorkAddress</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="work">WorkAddress</Label>
            <Input
              value={userWorkAddress}
              id="work"
              name="work"
              onChange={(e) => setUserWorkAddress(e.target.value)}
              placeholder="Add your work address"
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

export default UpdateWorkAddressModal;
