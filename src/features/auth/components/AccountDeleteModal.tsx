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
import { FC, useState } from 'react';
import { TAccountDeleteModal } from '../types/auth-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AccountDeleteModal: FC<TAccountDeleteModal> = ({
  open,
  setOpenChange,
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isConfirmValid = confirmText === 'CONFIRM';

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsDeleting(false);
    setShowSuccess(true);
  };

  const handleClose = () => {
    setConfirmText('');
    setShowSuccess(false);
    setOpenChange(false);
  };

  if (showSuccess) {
    return (
      <Dialog modal={true} open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-center">
              Account Deletion Scheduled
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Your account has been scheduled for deletion and will be
              permanently removed in 7 days.
            </DialogDescription>
          </DialogHeader>

          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm text-blue-800">
              You can cancel this deletion within the next 7 days by logging
              back into your account. After 7 days, all your data will be
              permanently deleted and cannot be recovered.
            </AlertDescription>
          </Alert>

          <DialogFooter className="sm:justify-center">
            <Button onClick={handleClose} className="w-full sm:w-auto">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog modal={true} open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription className="pt-2">
            This action cannot be undone. Your account will be scheduled for
            permanent deletion in 7 days.
          </DialogDescription>
        </DialogHeader>

        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            All your data, including profile information, settings, and content
            will be permanently deleted after 7 days.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="confirm-text">
            Type <span className="font-mono font-bold">CONFIRM</span> to delete
            your account
          </Label>
          <Input
            id="confirm-text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type CONFIRM here"
            className="font-mono"
          />
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isConfirmValid || isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Account'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDeleteModal;
