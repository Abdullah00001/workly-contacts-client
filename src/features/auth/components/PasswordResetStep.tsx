'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { getPasswordStrength } from '@/lib/validation/auth-validation';
import type { TPasswordResetStepProps } from '@/features/auth/types/recover-type';

export default function PasswordResetStep({
  onNavigate,
}: TPasswordResetStepProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password === confirmPassword && confirmPassword !== '';
  const canProceed = password && passwordsMatch && passwordStrength.score >= 3;

  const handleResetPassword = () => {
    if (!canProceed) return;
    onNavigate('success');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl sm:text-3xl text-foreground">
          Create New Password
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Choose a strong password for your account.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="new-password"
            className="text-sm font-medium text-foreground"
          >
            New Password
          </Label>
          <div className="relative">
            <Input
              id="new-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 pr-10 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>

          {password && (
            <div className="space-y-2">
              <div className="flex space-x-1">
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
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs space-y-1">
                <div
                  className={`flex items-center space-x-1 ${passwordStrength.checks.length ? 'text-green-600' : 'text-gray-400'}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${passwordStrength.checks.length ? 'bg-green-600' : 'bg-gray-400'}`}
                  />
                  <span>At least 8 characters</span>
                </div>
                <div
                  className={`flex items-center space-x-1 ${passwordStrength.checks.uppercase ? 'text-green-600' : 'text-gray-400'}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${passwordStrength.checks.uppercase ? 'bg-green-600' : 'bg-gray-400'}`}
                  />
                  <span>One uppercase letter</span>
                </div>
                <div
                  className={`flex items-center space-x-1 ${passwordStrength.checks.number ? 'text-green-600' : 'text-gray-400'}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${passwordStrength.checks.number ? 'bg-green-600' : 'bg-gray-400'}`}
                  />
                  <span>One number</span>
                </div>
                <div
                  className={`flex items-center space-x-1 ${passwordStrength.checks.special ? 'text-green-600' : 'text-gray-400'}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${passwordStrength.checks.special ? 'bg-green-600' : 'bg-gray-400'}`}
                  />
                  <span>One special character</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirm-password"
            className="text-sm font-medium text-foreground"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleResetPassword()}
              className={`h-12 pr-10 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3] ${
                confirmPassword && !passwordsMatch ? 'border-red-500' : ''
              }`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {confirmPassword && !passwordsMatch && (
            <p className="text-red-500 text-xs">Passwords do not match</p>
          )}
        </div>

        <Button
          onClick={handleResetPassword}
          disabled={!canProceed}
          className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: '#3F3FF3' }}
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
}
