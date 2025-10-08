'use client';

import type React from 'react';

import { FC, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  TChangePasswordModalProps,
  TChangePasswordPayload,
} from '../types/personal-info-types';
import { ChangePassword } from '../services/personal-info-services';
import { getPasswordStrength } from '@/lib/validation/auth-validation';

const ChangePasswordModal: FC<TChangePasswordModalProps> = ({
  isOpenChangePasswordModal,
  setOpenChangePasswordModal,
}) => {
  const queryClient = useQueryClient();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: TChangePasswordPayload) =>
      await ChangePassword(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['security_overview'],
        (oldData: AxiosResponse) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            lastPasswordChange: data.change_at,
          };
        }
      );
      toast.success('Password Change Successful', { closeButton: false });
      setOpenChangePasswordModal(false);
      // Reset form on success
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error.response?.data?.message, {
          closeButton: false,
        });
      } else {
        toast.error('Unknown Error Occurred,Try Again!', {
          closeButton: false,
        });
      }
    },
  });

  const passwordStrength = getPasswordStrength(newPassword);

  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;
  const passwordsDontMatch =
    newPassword && confirmPassword && newPassword !== confirmPassword;

  const isFormValid =
    currentPassword && newPassword && confirmPassword && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    mutate({ password: newPassword, currentPassword });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    setOpenChangePasswordModal(newOpen);
  };

  return (
    <Dialog open={isOpenChangePasswordModal} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new secure password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`${passwordsMatch ? 'border-green-500 focus-visible:ring-green-500' : ''} ${passwordsDontMatch ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded ${
                          level <= passwordStrength.score
                            ? passwordStrength.strength === 'weak'
                              ? 'bg-red-500'
                              : passwordStrength.strength === 'medium'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-2 space-y-1 text-xs">
                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordStrength.checks.length
                          ? 'text-green-600 dark:text-green-500'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          passwordStrength.checks.length
                            ? 'bg-green-600 dark:bg-green-500'
                            : 'bg-gray-400 dark:bg-gray-600'
                        }`}
                      />
                      <span>At least 8 characters</span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordStrength.checks.uppercase
                          ? 'text-green-600 dark:text-green-500'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          passwordStrength.checks.uppercase
                            ? 'bg-green-600 dark:bg-green-500'
                            : 'bg-gray-400 dark:bg-gray-600'
                        }`}
                      />
                      <span>One uppercase letter</span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordStrength.checks.number
                          ? 'text-green-600 dark:text-green-500'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          passwordStrength.checks.number
                            ? 'bg-green-600 dark:bg-green-500'
                            : 'bg-gray-400 dark:bg-gray-600'
                        }`}
                      />
                      <span>One number</span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordStrength.checks.special
                          ? 'text-green-600 dark:text-green-500'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          passwordStrength.checks.special
                            ? 'bg-green-600 dark:bg-green-500'
                            : 'bg-gray-400 dark:bg-gray-600'
                        }`}
                      />
                      <span>One special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${passwordsMatch ? 'border-green-500 focus-visible:ring-green-500' : ''} ${passwordsDontMatch ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordsDontMatch && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
              {passwordsMatch && (
                <p className="text-sm text-green-500">Passwords match</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !isFormValid}>
              {isPending ? 'Changing...' : 'Change Password'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
