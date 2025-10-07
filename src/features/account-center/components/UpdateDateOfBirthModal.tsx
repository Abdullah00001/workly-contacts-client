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
import {
  TProfileUpdatePayload,
  TUpdateDateOfBirthModalProps,
} from '../types/personal-info-types';
import { UpdateProfileField } from '../services/personal-info-services';
import { toast } from 'sonner';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UpdateDateOfBirthModal: FC<TUpdateDateOfBirthModalProps> = ({
  isUpdateDateOfBirthModalOpen,
  dateOfBirth,
  setIsUpdateDateOfBirthModalOpen,
}) => {
  const queryClient = useQueryClient();
  const [userDob, setUserDob] = useState<string>('');
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: TProfileUpdatePayload) =>
      await UpdateProfileField(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['personal_info'], (oldData: AxiosResponse) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          dateOfBirth: data.dateOfBirth,
        };
      });
      toast.success('Date Of Birth Changed', { closeButton: false });
      setIsUpdateDateOfBirthModalOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast.error('Date Of Birth Change Failed,Try Again!', {
        closeButton: false,
      });
    },
  });
  const isFieldChange = dateOfBirth === userDob;
  const handleSave = () => {
    if (!isFieldChange) {
      mutate({ dateOfBirth: userDob });
    }
  };
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
          <Button
            onClick={handleSave}
            disabled={isFieldChange || isPending}
            type="submit"
          >
            {isPending ? 'Processing...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDateOfBirthModal;
