'use client';

import { FC, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TUpdateContactAvatarModal } from '../types/type';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const UpdateContactAvatarModal: FC<TUpdateContactAvatarModal> = ({
  open,
  payload,
  setOpen,
  setPayload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog onOpenChange={setOpen} open={open} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update contact photo</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="relative">
            <Avatar className="size-32 border-2 border-border">
              <AvatarImage
                src={payload.avatar?.url || '/placeholder.svg'}
                alt={payload?.firstName}
              />
              <AvatarFallback className="text-2xl">
                {payload?.firstName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Loading Overlay */}
            {/* {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            )} */}
          </div>
          {/* Helper Text */}
          <p className="text-center text-xs text-muted-foreground">
            Recommended: Square image, at least 400x400px
            <br />
            Max file size: 5MB
          </p>
        </div>
        <DialogFooter>
          <Button className="flex-1" variant="default">
            <Edit className="size-4" />
            Change
          </Button>

          <Button variant="destructive" className="flex-1">
            <Trash2 className="size-4" />
            Remove
          </Button>
        </DialogFooter>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className={'hidden'}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateContactAvatarModal;
