'use client';

import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Icon from './Icon';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TLabel } from '@/features/dashboard/types/type';
import { RetrieveLabels } from '@/features/dashboard/services/label-services';
import { Separator } from '../ui/separator';
import {
  LabelUpdate,
  RetrieveContacts,
} from '@/features/dashboard/services/contacts-service';
import { TContacts } from './ContactTable';
import LabelItem from './LabelItem';
import { Dialog, DialogTrigger } from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useLabelModalStore } from '@/stores/label-modal-store';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export type TLabelsProps = {
  selectedContactIds: string[];
  setSelectContact: Dispatch<SetStateAction<string[]>>;
};

const Label: FC<TLabelsProps> = ({ selectedContactIds, setSelectContact }) => {
  const queryClient = useQueryClient();
  const { toggleCreateLabelModal } = useLabelModalStore();
  const [open, setOpen] = useState<boolean>(false);
  const [selectLabels, setSelectLabels] = useState<string[]>([]);
  const [labelChange, setLabelChange] = useState(false);

  const { data: label } = useQuery({
    queryKey: ['labels'],
    queryFn: RetrieveLabels,
  });

  const { data: contacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: RetrieveContacts,
  });

  const { mutate, isPending } = useMutation({
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

        return old.map((contact) => {
          const updateItem = variables.labelUpdateTree.find(
            (item) => item.contactId === contact._id
          );

          if (updateItem) {
            return {
              ...contact,
              labels: updateItem.labelIds,
            };
          }
          return contact;
        });
      });

      return { previousContacts };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['labels'] });
      toast(
        `${selectedContactIds.length} contact${selectedContactIds.length > 1 ? 's' : ''} labeled`,
        {
          closeButton: false,
          position: 'bottom-center',
        }
      );
      setSelectContact([]);
      setOpen(false);
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

  const selectedContacts = useMemo(() => {
    if (!contacts || !selectedContactIds?.length) return [];
    return (contacts as TContacts[]).filter((contact) =>
      selectedContactIds.includes(contact._id)
    );
  }, [contacts, selectedContactIds]);

  const commonLabels = useMemo(() => {
    if (!selectedContacts.length) return [];

    // Get labels from first contact
    const firstContactLabels = (selectedContacts[0] as TContacts).labels || [];

    // If only one contact selected, return all its labels
    if (selectedContacts.length === 1) {
      return firstContactLabels.map((labelId: string) => labelId);
    }

    // Find labels that exist in ALL selected contacts
    return firstContactLabels.filter((labelId: string) =>
      selectedContacts.every((contact: any) =>
        (contact.labels || []).includes(labelId)
      )
    );
  }, [selectedContacts]);

  // Calculate which labels to add and which to remove
  const labelChanges = useMemo(() => {
    const toAdd = selectLabels.filter(
      (labelId) => !commonLabels.includes(labelId)
    );
    const toRemove = commonLabels.filter(
      (labelId) => !selectLabels.includes(labelId)
    );
    return { toAdd, toRemove };
  }, [selectLabels, commonLabels]);

  const handleApply = () => {
    if (!selectedContactIds.length || !contacts) return;

    const { toAdd, toRemove } = labelChanges;

    // Prepare the payload - merge existing labels with changes for EACH contact
    const payload = {
      labelUpdateTree: selectedContacts.map((contact) => {
        const currentLabels = (contact as TContacts).labels || [];

        // Remove labels that were unchecked
        let updatedLabels = currentLabels.filter(
          (labelId: string) => !toRemove.includes(labelId)
        );

        // Add new labels that were checked
        toAdd.forEach((labelId) => {
          if (!updatedLabels.includes(labelId)) {
            updatedLabels.push(labelId);
          }
        });

        return {
          contactId: (contact as TContacts)._id,
          labelIds: updatedLabels,
        };
      }),
    };

    // Call the mutation
    mutate(payload);
  };

  // Initialize selectLabels with common labels when dropdown opens or selected contacts change
  useEffect(() => {
    if (open) {
      setSelectLabels(commonLabels);
    }
  }, [open, commonLabels]);

  useEffect(() => {
    if (isPending) {
      toast(`Working...`, {
        closeButton: false,
        position: 'bottom-center',
      });
    }
  }, [isPending]);

  useEffect(() => {
    const hasChanged =
      JSON.stringify([...selectLabels].sort()) !==
      JSON.stringify([...commonLabels].sort());

    setLabelChange(hasChanged);
  }, [selectLabels, commonLabels]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={`flex items-center justify-center w-[45px] h-[45px] cursor-pointer rounded-full hover:bg-[#0b57d030]`}
      >
        <Icon
          name="label"
          className={`text-[#0b57d0]`}
          size={20}
          type="icons"
          variant="outlined"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-[256px] overflow-y-auto mr-[30px] lg:mr-[90px] bg-white border border-gray-200 shadow-lg px-0 rounded-none py-2`}
      >
        <h5 className="px-4 w-full text-[#1f1f1f] text-sm font-google-sans-text">
          Manage Labels
        </h5>
        <div className="mt-1 max-h-[220px] w-full overflow-y-auto mb-2">
          {(label as TLabel[])?.map((label) => (
            <LabelItem
              key={label?._id}
              label={label}
              selectLabel={selectLabels}
              setSelectLabel={setSelectLabels}
            />
          ))}
        </div>
        <Separator />
        {labelChange ? (
          <DropdownMenuItem
            onClick={handleApply}
            disabled={isPending}
            className="w-full mt-2 text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 !rounded-none flex items-center gap-4 cursor-pointer"
          >
            <Icon
              name="check"
              variant="outlined"
              className=" text-[#444746]"
              size={22}
              type="symbols"
            />
            <span>{isPending ? 'Applying...' : 'Apply'}</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={toggleCreateLabelModal}
            className="w-full mt-2 text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 !rounded-none flex items-center gap-4 cursor-pointer"
          >
            <Icon
              name="add"
              variant="outlined"
              className=" text-[#444746]"
              size={22}
              type="symbols"
            />
            <span>Create Label</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Label;
