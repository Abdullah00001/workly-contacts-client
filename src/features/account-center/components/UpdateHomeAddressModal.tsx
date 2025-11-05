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
  TUpdateHomeAddressModalProps,
  TProfileUpdatePayload,
} from '../types/personal-info-types';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProfileField } from '../services/personal-info-services';

const UpdateHomeAddressModal: FC<TUpdateHomeAddressModalProps> = ({
  location,
  isUpdateHomeAddressModalOpen,
  setIsUpdateHomeAddressModalOpen,
}) => {
  const queryClient = useQueryClient();
  const [userHomeAddress, setUserHomeAddress] = useState<string>('');
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
      toast.success('Home Address Changed', { closeButton: false });
      setIsUpdateHomeAddressModalOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast.error('Home Address  Failed,Try Again!', { closeButton: false });
    },
  });
  const isFieldChange = location.home === userHomeAddress;
  const handleSave = () => {
    if (!isFieldChange) {
      mutate({ location: { ...location, home: userHomeAddress } });
    }
  };
  useEffect(() => {
    setUserHomeAddress(location.home ?? '');
  }, [location]);
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

export default UpdateHomeAddressModal;
