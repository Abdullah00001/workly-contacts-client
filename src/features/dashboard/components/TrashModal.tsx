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
import {
  BulkTrash,
  SingleTrash,
} from '@/features/contact-details/service/contact-detail-service';
import { TTrashModal } from '@/features/contact-details/types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, type FC } from 'react';
import { toast } from 'sonner';

const TrashModal: FC<TTrashModal> = ({
  bulkId,
  open,
  setOpen,
  singleId,
  isDetailPage,
  setSelectContact,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isPending: isSinglePending, mutate: singleTrash } = useMutation({
    mutationFn: async (payload: string) => await SingleTrash(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contacts', singleId] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['trash'] });
      toast(`1 contact moved to trash`, {
        closeButton: false,
        position: 'bottom-center',
      });
      setSelectContact([]);
      if (isDetailPage) router.push('/dashboard');
      setOpen(false);
      return;
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
  const { isPending: isBulkPending, mutate: bulkTrash } = useMutation({
    mutationFn: async (payload: { contactIds: string[] }) =>
      await BulkTrash(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['trash'] });
      setSelectContact([]);
      toast(`${bulkId?.length} contact moved to trash`, {
        closeButton: false,
        position: 'bottom-center',
      });
      setOpen(false);
      return;
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
  const loading = isSinglePending || isBulkPending;
  const handleTrash = () => {
    if (bulkId && bulkId?.length > 0) {
      bulkTrash({ contactIds: bulkId });
      return;
    }
    if (singleId) singleTrash(singleId);
  };
  useEffect(() => {
    if (loading) {
      toast('Working...', { closeButton: false, position: 'bottom-center' });
    }
  }, [loading]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>
            {singleId ? 'Delete from contacts?' : 'Delete selected contacts?'}
          </DialogTitle>
          <DialogDescription>
            {singleId
              ? 'This contact will be permanently deleted from this account after 30 days.'
              : 'These contacts will be permanently deleted from this account after 30 days.'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={(e) => e.stopPropagation()}>Cancel</Button>
          </DialogClose>
          <Button
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from bubbling to row
              handleTrash();
            }}
          >
            Move to trash
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrashModal;
