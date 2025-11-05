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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const UpdateContactAvatarModal: FC<TUpdateContactAvatarModal> = ({
  open,
  payload,
  setOpen,
  setPayload,
  newImage,
  setNewImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB.');
      return;
    }
    setNewImage(file);
    setPayload((prev) => ({
      ...prev,
      avatar: { ...prev.avatar, url: URL.createObjectURL(file) },
    }));
  };
  const handleRemove = async () => {
    if (newImage) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setNewImage(null);
      setPayload((prev) => ({
        ...prev,
        avatar: { ...prev.avatar, url: null },
      }));
    }
    if (payload?.avatar?.publicId && payload?.avatar?.url && !newImage) {
      setPayload((prev) => ({
        ...prev,
        avatar: { ...prev.avatar, url: null },
      }));
    }
  };
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
          </div>
          {/* Helper Text */}
          <p className="text-center text-xs text-muted-foreground">
            Recommended: Square image, at least 400x400px
            <br />
            Max file size: 5MB
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
              fileInputRef.current?.click();
            }}
            className="flex-1"
            variant="default"
          >
            <Edit className="size-4" />
            Change
          </Button>

          <Button
            onClick={handleRemove}
            variant="destructive"
            className="flex-1"
          >
            <Trash2 className="size-4" />
            Remove
          </Button>
        </DialogFooter>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className={'hidden'}
          onChange={handleUpload}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateContactAvatarModal;
