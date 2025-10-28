'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Eye,
  EyeOff,
  Lock,
  AlertCircle,
  CheckCircle,
  LockOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { getPasswordStrength } from '@/lib/validation/auth-validation';

interface AccountUnlockFormProps {
  onSubmit: (data: {
    newPassword: string;
    confirmPassword: string;
  }) => Promise<void>;
  isLoading: boolean;
  successMessage: string;
  errorMessage: string;
  uuid: string;
}

export default function AccountUnlockForm({
  onSubmit,
  isLoading,
  successMessage,
  errorMessage,
  uuid,
}: AccountUnlockFormProps) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const passwordStrength = getPasswordStrength(formData.newPassword);
  const passwordsMatch =
    formData.newPassword === formData.confirmPassword &&
    formData.confirmPassword !== '';
  const isPasswordStrong = passwordStrength.score >= 3;
  const canProceed = formData.newPassword && passwordsMatch && isPasswordStrong;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed) return;
    await onSubmit(formData);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Form Container - Centered */}
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-full space-y-6">
          {/* Header */}
          <div className="space-y-3 text-center">
            <div className="flex justify-center">
              <LockOpen className="w-8 h-8" style={{ color: '#3F3FF3' }} />
            </div>
            <div className="lg:hidden block space-y-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Unlock Your Account
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Choose a strong password for your account.
              </p>
            </div>
            <div className="lg:block hidden space-y-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Create New Password
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Choose a strong password for your account.
              </p>
            </div>
          </div>

          {/* Messages */}
          {successMessage && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`h-12 pr-10 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3] ${
                    formData.newPassword && passwordsMatch
                      ? 'border-green-500 border-2 outline-green-500 focus:border-green-500'
                      : 'border-gray-200'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {formData.newPassword && (
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
                      className={`flex items-center space-x-1 ${passwordStrength.checks.lowercase ? 'text-green-600' : 'text-gray-400'}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${passwordStrength.checks.lowercase ? 'bg-green-600' : 'bg-gray-400'}`}
                      />
                      <span>One lowercase letter</span>
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading || !isPasswordStrong}
                  className={`h-12 pr-10 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3] ${
                    formData.confirmPassword && passwordsMatch
                      ? 'border-green-500 border-2 outline-green-500 focus:border-green-500'
                      : 'border-gray-200'
                  } ${formData.confirmPassword && !passwordsMatch ? 'border-red-500' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading || !isPasswordStrong}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <p className="text-red-500 text-xs">Passwords do not match</p>
              )}
              {!isPasswordStrong && formData.newPassword && (
                <p className="text-gray-500 text-xs">
                  Create a stronger password to continue
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!canProceed || isLoading}
              className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer disabled:opacity-50"
              style={{ backgroundColor: '#3F3FF3' }}
            >
              {isLoading ? 'Processing...' : 'Reset Password'}
            </Button>
          </form>
        </div>
      </div>

      <div className="lg:hidden border-t border-gray-200 bg-white px-4 sm:px-6 py-6 mt-6 flex-shrink-0">
        <div className="max-w-md mx-auto space-y-4">
          {/* Helpful Links */}
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link
              href="/help"
              className="text-gray-600 hover:text-[#3F3FF3] transition-colors"
            >
              Help
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-[#3F3FF3] transition-colors"
            >
              Privacy
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-[#3F3FF3] transition-colors"
            >
              Terms
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-[#3F3FF3] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-gray-500">
            © 2025 Workly Contact. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
