'use client';

import { TLabel } from '@/features/dashboard/types/type';
import { useEffect, type FC } from 'react';
import Icon from './Icon';
import { TContacts } from './ContactTable';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LabelUpdate } from '@/features/dashboard/services/contacts-service';
import { AxiosError } from 'axios';
import { DropdownMenuItem } from '../ui/dropdown-menu';

export type TMoreActionLabelItem = {
  label: TLabel;
  contact: TContacts;
};

const MoreActionLabelItem: FC<TMoreActionLabelItem> = ({ contact, label }) => {
  const { labelName, _id } = label;
  const queryClient = useQueryClient();

  // Check if this label is currently assigned to the contact
  const isLabelActive = contact.labels?.includes(_id) || false;

  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: {
      labelUpdateTree: {
        contactId: string;
        labelIds: string[];
      }[];
    }) => LabelUpdate(payload),
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['contacts'] });

      // Snapshot the previous value
      const previousContacts = queryClient.getQueryData(['contacts']);

      // Optimistically update contacts
      queryClient.setQueryData(['contacts'], (old: TContacts[] | undefined) => {
        if (!old) return old;

        return old.map((c) => {
          const updateItem = variables.labelUpdateTree.find(
            (item) => item.contactId === c._id
          );

          if (updateItem) {
            return {
              ...c,
              labels: updateItem.labelIds,
            };
          }
          return c;
        });
      });

      return { previousContacts };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['labels'] });
      toast(`1 contact labeled`, {
        closeButton: false,
        position: 'bottom-center',
      });
    },
    onError: (error, variables, context) => {
      // Rollback to previous state on error
      if (context?.previousContacts) {
        queryClient.setQueryData(['contacts'], context.previousContacts);
      }

      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            'Unwanted error occurred, Try Again!',
          {
            closeButton: false,
            position: 'bottom-center',
          }
        );
      } else {
        toast.error('Unwanted error occurred, Try Again!', {
          closeButton: false,
          position: 'bottom-center',
        });
      }
    },
  });

  const handleToggleLabel = () => {
    const currentLabels = contact.labels || [];
    let updatedLabels: string[];

    if (isLabelActive) {
      // Remove the label
      updatedLabels = currentLabels.filter((labelId) => labelId !== _id);
    } else {
      // Add the label
      updatedLabels = [...currentLabels, _id];
    }

    const payload = {
      labelUpdateTree: [
        {
          contactId: contact._id,
          labelIds: updatedLabels,
        },
      ],
    };

    mutate(payload);
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
    <DropdownMenuItem
      onClick={handleToggleLabel}
      disabled={isPending}
      className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center hover:rounded-none justify-between cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <Icon
          name="label"
          variant="outlined"
          className=" text-[#444746]"
          size={22}
          type="symbols"
        />
        <span>{labelName}</span>
      </div>
      {isLabelActive && (
        <Icon
          name="check"
          variant="filled"
          className=" text-[#0b57d0]"
          size={22}
          type="symbols"
        />
      )}
    </DropdownMenuItem>
  );
};

export default MoreActionLabelItem;
