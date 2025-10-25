'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, type FC } from 'react';
import { EmptyTrashContacts } from '../services/trash-service';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { TEmptyTrash } from '../types/type';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const EmptyTrash: FC<TEmptyTrash> = ({ trash }) => {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: EmptyTrashContacts,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['trash'] });
      toast('All Trashed Item Removed', {
        closeButton: false,
        position: 'bottom-center',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message, {
          closeButton: false,
          position: 'bottom-center',
        });
      }
      toast.error('Empty Trash Operation failed,Try Again!', {
        closeButton: false,
        position: 'bottom-center',
      });
    },
  });
  useEffect(() => {
    if (isPending) {
      toast('Working...', {
        closeButton: false,
        position: 'bottom-center',
      });
    }
  }, [isPending]);
  return (
    <div className="w-full flex items-center justify-start p-1 bg-[#e1e3e1]">
      <div className="py-[10px] pl-5 pr-3">
        <p className="text-[#444746] text-sm font-google-sans-text">
          Contacts that have been in Trash more than 30 days will be deleted
          forever
        </p>
      </div>
      <div className="h-[48px] flex justify-center items-center sm:flex-shrink-0">
        <div className="h-10 flex justify-center items-center">
          <button
            disabled={trash.length === 0}
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            className={`text-sm p-3 whitespace-nowrap text-center w-full h-full font-google-sans-text ${trash.length === 0 ? 'text-[#444746] cursor-not-allowed' : 'cursor-pointer hover:bg-[#0b57d012] text-[#0b57d0]  rounded-full font-medium'}`}
          >
            Empty Trash now
          </button>
        </div>
      </div>
      <Dialog modal={true} open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[24px] font-normal font-google-sans text-[#1f1f1f]">
              Empty Trash?
            </DialogTitle>
            <DialogDescription>
              Contacts in Trash will be deleted forever. This can{`'`}t be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button
              onClick={(e) => {
                e.preventDefault();
                (mutate(), setOpen(false));
              }}
              className="cursor-pointer"
            >
              Empty Trash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmptyTrash;
