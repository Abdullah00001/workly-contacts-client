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
  TUpdateWorkAddressModalProps,
  TProfileUpdatePayload,
} from '../types/personal-info-types';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProfileField } from '../services/personal-info-services';

const UpdateWorkAddressModal: FC<TUpdateWorkAddressModalProps> = ({
  location,
  isUpdateWorkAddressModalOpen,
  setIsUpdateWorkAddressModalOpen,
}) => {
  const queryClient = useQueryClient();
  const [userWorkAddress, setUserWorkAddress] = useState<string>('');
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: TProfileUpdatePayload) =>
      await UpdateProfileField(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['personal_info'], (oldData: AxiosResponse) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          location: {
            home: data.location.home,
            work: data.location.work,
          },
        };
      });
      toast.success('Work Address Changed', { closeButton: false });
      setIsUpdateWorkAddressModalOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast.error('Work Address  Failed,Try Again!', { closeButton: false });
    },
  });
  const isFieldChange = location.work === userWorkAddress;
  const handleSave = () => {
    if (!isFieldChange) {
      mutate({ location: { ...location, work: userWorkAddress } });
    }
  };
  useEffect(() => {
    setUserWorkAddress(location.work ?? '');
  }, [location]);
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

export default UpdateWorkAddressModal;
