'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChangeEvent, FC, useRef } from 'react';
import { TUpdateProfileAvatarModalProps } from '../types/personal-info-types';
import {
  UpdateProfileAvatar,
  DeleteProfileAvatar,
} from '../services/personal-info-services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AxiosResponse } from 'axios';

const UpdateProfileAvatarModal: FC<TUpdateProfileAvatarModalProps> = ({
  name,
  avatar,
  isUpdateProfileAvatarModalOpen,
  setIsUpdateProfileAvatarModalOpen,
}) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isPending: isChanging, mutate: change } = useMutation({
    mutationFn: async (payload: FormData) => await UpdateProfileAvatar(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['personal_info'], (oldData: AxiosResponse) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          avatar: data,
        };
      });
      setIsUpdateProfileAvatarModalOpen(false);
      toast.success('Profile Picture Changed', { closeButton: false });
    },
    onError: (error) => {
      console.error('Profile picture change failed:', error);
      toast.error('Profile picture change failed,Try Again', {
        closeButton: false,
      });
    },
  });
  const { isPending: isRemoving, mutate: remove } = useMutation({
    mutationFn: async (payload: string) => await DeleteProfileAvatar(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['personal_info'], (oldData: AxiosResponse) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          avatar: {
            url: null,
            publicId: null,
          },
        };
      });
      setIsUpdateProfileAvatarModalOpen(false);
      toast.success('Profile Picture Removed', { closeButton: false });
    },
    onError: (error) => {
      console.error('Profile picture upload failed:', error);
      toast.error('Profile picture upload failed,Try Again', {
        closeButton: false,
      });
    },
  });
  const isLoading = isChanging || isRemoving;
  const hasAvatar = Boolean(avatar?.url && avatar?.publicId);
  const avatarUrl =
    avatar?.url || `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const payload = new FormData();
      payload.append('publicId', avatar.publicId as string);
      payload.append('avatar', file);
      change(payload);
    }
  };
  const handleRemoveClick = () => {
    if (avatar.publicId) {
      remove(avatar.publicId);
    }
  };
  return (
    <Dialog
      onOpenChange={setIsUpdateProfileAvatarModalOpen}
      open={isUpdateProfileAvatarModalOpen}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile Picture</DialogTitle>
          <DialogDescription>
            Update or remove your profile picture
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="relative">
            <Avatar className="size-32 border-2 border-border">
              <AvatarImage src={avatarUrl || '/placeholder.svg'} alt={name} />
              <AvatarFallback className="text-2xl">
                {name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            )}
          </div>
          {/* Action Buttons */}
          <div className="flex w-full gap-3">
            <Button
              onClick={handleEditClick}
              disabled={isLoading }
              className={`flex-1 ${isLoading  ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              variant="default"
            >
              <Edit className="size-4" />
              Change
            </Button>

            <Button
              onClick={handleRemoveClick}
              disabled={isLoading || !hasAvatar}
              variant="destructive"
              className={`flex-1 ${isLoading || !hasAvatar ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              <Trash2 className="size-4" />
              Remove
            </Button>
          </div>
          {/* Helper Text */}
          <p className="text-center text-xs text-muted-foreground">
            Recommended: Square image, at least 400x400px
            <br />
            Max file size: 5MB
          </p>
        </div>
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className={'hidden'}
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileAvatarModal;
