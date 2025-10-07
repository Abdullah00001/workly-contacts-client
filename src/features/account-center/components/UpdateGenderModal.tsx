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
import {
  TProfileUpdatePayload,
  TUpdateGenderModalProps,
} from '../types/personal-info-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProfileField } from '../services/personal-info-services';

const UpdateGenderModal: FC<TUpdateGenderModalProps> = ({
  isUpdateGenderModalOpen,
  gender,
  setIsUpdateGenderModalOpen,
}) => {
  const queryClient = useQueryClient();
  const [userGender, setUserGender] = useState<string | undefined>(undefined);
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: TProfileUpdatePayload) =>
      await UpdateProfileField(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['personal_info'], (oldData: AxiosResponse) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          gender: data.gender,
        };
      });
      toast.success('Gender Changed', { closeButton: false });
      setIsUpdateGenderModalOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast.error('Gender Change Failed,Try Again!', { closeButton: false });
    },
  });
  const isFieldChange = gender === userGender;
  const handleSave = () => {
    if (!isFieldChange) {
      mutate({ gender: userGender });
    }
  };
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
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
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

export default UpdateGenderModal;
