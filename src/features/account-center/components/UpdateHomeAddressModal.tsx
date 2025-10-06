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
import { TUpdateHomeAddressModalProps } from '../types/personal-info-types';
const UpdateHomeAddressModal: FC<TUpdateHomeAddressModalProps> = ({
  home,
  isUpdateHomeAddressModalOpen,
  setIsUpdateHomeAddressModalOpen,
}) => {
  const [userHomeAddress, setUserHomeAddress] = useState<string>('');

  useEffect(() => {
    setUserHomeAddress(home ?? '');
  }, [home]);
  return (
    <Dialog
      open={isUpdateHomeAddressModalOpen}
      onOpenChange={setIsUpdateHomeAddressModalOpen}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Edit HomeAddress</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="home">HomeAddress</Label>
            <Input
              value={userHomeAddress}
              id="home"
              name="home"
              onChange={(e) => setUserHomeAddress(e.target.value)}
              placeholder="Add your home address"
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

export default UpdateHomeAddressModal;
