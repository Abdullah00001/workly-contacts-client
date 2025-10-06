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
import { Label } from '@/components/ui/label';
import { FC, useEffect, useState } from 'react';
import { TUpdateGenderModalProps } from '../types/personal-info-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const UpdateGenderModal: FC<TUpdateGenderModalProps> = ({
  isUpdateGenderModalOpen,
  gender,
  setIsUpdateGenderModalOpen,
}) => {
  const [userGender, setUserGender] = useState<string | undefined>(undefined);
  useEffect(() => {
    setUserGender(gender ?? undefined);
  }, [gender]);
  return (
    <Dialog
      modal={false}
      open={isUpdateGenderModalOpen}
      onOpenChange={setIsUpdateGenderModalOpen}
    >
      <DialogContent id="dialog-portal" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Gender</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="gender">Gender</Label>
            <Select
              onValueChange={(value) => setUserGender(value)}
              value={userGender}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
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

export default UpdateGenderModal;
