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
  TUpdateNameModalProps,
} from '../types/personal-info-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProfileField } from '../services/personal-info-services';
import { toast } from 'sonner';
import { AxiosResponse } from 'axios';
const UpdateNameModal: FC<TUpdateNameModalProps> = ({
  isUpdateNameModalOpen,
  name,
  setIsUpdateNameModalOpen,
}) => {
  const queryClient = useQueryClient();
  const [userName, setUserName] = useState<string>('');
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: TProfileUpdatePayload) =>
      await UpdateProfileField(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['personal_info'], (oldData: AxiosResponse) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          name: data.name,
        };
      });
      toast.success('Name Changed', { closeButton: false });
      setIsUpdateNameModalOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast.error('Name Change Failed,Try Again!', { closeButton: false });
    },
  });
  const isFieldChange = name === userName;
  const handleSave = () => {
    if (!isFieldChange) {
      mutate({ name: userName });
    }
  };
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

export default UpdateNameModal;
