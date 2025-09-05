'use client';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="user@company.com"
            className="h-12 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
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
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="rounded border-gray-300 cursor-pointer"
            />
            <Label
              htmlFor="remember"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Remember Me
            </Label>
          </div>
          <Button
            variant="link"
            className="p-0 h-auto text-sm hover:text-opacity-80 cursor-pointer"
            style={{ color: '#3F3FF3' }}
          >
            <Link href={'/auth/recover'}>Forgot Your Password?</Link>
          </Button>
        </div>
      </div>

      <Button
        className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer"
        style={{ backgroundColor: '#3F3FF3' }}
      >
        Log In
      </Button>
    </>
  );
};

export default LoginForm;
