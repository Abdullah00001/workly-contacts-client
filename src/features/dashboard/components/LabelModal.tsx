'use client';
import { useLabelModalStore } from '@/stores/label-modal-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, type FC } from 'react';
import { CreateLabel } from '../services/label-services';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const LabelModal: FC = () => {
  const {
    isCreateLabelModalOpen,
    isRenameLabelModalOpen,
    toggleCreateLabelModal,
    toggleRenameLabelModal,
  } = useLabelModalStore();
  const queryClient = useQueryClient();
  const [labelName, setLabelName] = useState<string>('');
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: { labelName: string }) =>
      await CreateLabel(payload),
    onSuccess: (data) => {
      toast(`Label ${data?.labelName} created`, {
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
    mutate({ labelName });
    toggleCreateLabelModal();
  };
  useEffect(() => {
    if (isPending) {
      toast(`Working...`, {
        closeButton: false,
        position: 'bottom-center',
      });
    }
  }, [isPending]);
  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0"
    >
      <div className="bg-white w-full p-5 rounded-[14px] md:p-6 md:w-96 shadow-lg">
        <h2 className="text-[1.5rem] font-normal font-google-sans text-[#1f1f1f]">
          {(isCreateLabelModalOpen && 'Create') ||
            (isRenameLabelModalOpen && 'Rename')}{' '}
          Label
        </h2>
        <input
          className="border w-full placeholder:text-[#444746] placeholder:font-google-sans placeholder:font-normal placeholder:text-[1rem] focus:outline-2 text-[1rem] font-google-sans text-[#1f1f1f] outline-[#0b57d0] border-[#747775] rounded-[6px] px-4 py-4 mt-4"
          placeholder="New Label"
          type="text"
          id="labelName"
          name="labelName"
          onChange={(e) => setLabelName(e.target.value)}
          value={labelName}
        />
        <div className="flex justify-end items-center mt-6 gap-1">
          <button
            onClick={() =>
              (isCreateLabelModalOpen && toggleCreateLabelModal()) ||
              (isRenameLabelModalOpen && toggleRenameLabelModal())
            }
            className="text-[#0b57d0] px-4 py-2 rounded-[16px] cursor-pointer font-google-sans text-sm font-medium text-center hover:bg-[rgba(11,87,208,0.08)]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-[#0b57d0] px-4 py-2 rounded-[16px] cursor-pointer font-google-sans text-sm font-medium text-center hover:bg-[rgba(11,87,208,0.08)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabelModal;
