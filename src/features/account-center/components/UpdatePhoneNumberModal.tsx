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
  TUpdatePhoneNumberModalProps,
  TProfileUpdatePayload,
} from '../types/personal-info-types';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProfileField } from '../services/personal-info-services';

const UpdatePhoneNumberModal: FC<TUpdatePhoneNumberModalProps> = ({
  isUpdatePhoneModalOpen,
  phone,
  setIsUpdatePhoneModalOpen,
}) => {
  const queryClient = useQueryClient();
  const [userPhone, setUserPhone] = useState<string>('');
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: TProfileUpdatePayload) =>
      await UpdateProfileField(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['personal_info'], (oldData: AxiosResponse) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          phone: data.phone,
        };
      });
      toast.success('Phone Number Changed', { closeButton: false });
      setIsUpdatePhoneModalOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast.error('Phone Number Change Failed,Try Again!', {
        closeButton: false,
      });
    },
  });
  const isFieldChange = phone === userPhone;
  const handleSave = () => {
    if (!isFieldChange) {
      mutate({ phone: userPhone });
    }
  };
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

export default UpdatePhoneNumberModal;
