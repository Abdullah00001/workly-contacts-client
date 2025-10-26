'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState, type FC } from 'react';
import { TLabelUpdateModal } from '../types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { UpdateLabel } from '../services/label-services';

const LabelUpdateModal: FC<TLabelUpdateModal> = ({
  _id,
  open,
  setOpen,
  currentLabelName,
}) => {
  const [labelName, setLabelName] = useState<string>('');
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: { labelName: string; _id: string }) =>
      await UpdateLabel(payload),
    onSuccess: (data) => {
      toast(`Label ${data?.labelName} updated`, {
        closeButton: false,
        position: 'bottom-center',
      });
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message, {
          closeButton: false,
          position: 'bottom-center',
        });
      toast.error('Unwanted error occurred,Try Again!');
    },
  });
  const handleSubmit = () => {
    if (labelName === '') return;
    mutate({ labelName, _id });
    setOpen(false);
  };
  const isChange = currentLabelName === labelName;
  useEffect(() => {
    if (currentLabelName) setLabelName(currentLabelName);
  }, [currentLabelName]);
  useEffect(() => {
    if (isPending) {
      toast(`Working...`, {
        closeButton: false,
        position: 'bottom-center',
      });
    }
  }, [isPending]);
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogContent
        className={`bg-white w-full p-5 rounded-[14px] md:p-6 md:w-96 shadow-lg`}
      >
        <DialogHeader>
          <DialogTitle className="text-[1.5rem] font-normal font-google-sans text-[#1f1f1f]">
            Rename Label
          </DialogTitle>
          <DialogDescription>
            <input
              className="border w-full placeholder:text-[#444746] placeholder:font-google-sans placeholder:font-normal placeholder:text-[1rem] focus:outline-2 text-[1rem] font-google-sans text-[#1f1f1f] outline-[#0b57d0] border-[#747775] rounded-[6px] px-4 py-4"
              placeholder="New Label"
              type="text"
              id="labelName"
              name="labelName"
              onChange={(e) => setLabelName(e.target.value)}
              value={labelName}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button className="text-[#0b57d0] px-4 py-2 rounded-[16px] cursor-pointer font-google-sans text-sm font-medium text-center hover:bg-[rgba(11,87,208,0.08)]">
              Cancel
            </button>
          </DialogClose>
          <button
            disabled={isChange}
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-[16px]  font-google-sans text-sm font-medium text-center ${isChange ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer text-[#0b57d0] hover:bg-[rgba(11,87,208,0.08)]'}`}
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LabelUpdateModal;
