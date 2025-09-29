'use client';
import { ChangeEvent, FC, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { TLoginPayload } from '@/features/auth/types/auth-types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useMutation } from '@tanstack/react-query';
import { LoginService } from '@/features/auth/service/auth-service';
import { AxiosError } from 'axios';

const LoginForm: FC = () => {
  const [payload, setPayload] = useState<TLoginPayload>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPayload((prev) => ({ ...prev, rememberMe: e.target.checked }));
  };
  const handleGoogleSignUp = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: TLoginPayload) => await LoginService(payload),
    onSuccess: (data) => {
      window.location.href = '/dashboard';
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setServerError(error.response?.data?.message || 'An error occurred');
      } else {
        setServerError('An unexpected error occurred');
      }
    },
  });
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    mutate(payload);
  };
  return (
    <>
      {serverError && (
        <Alert variant="destructive" className={`mb-4 !bg-transparent`}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Signup Failed</AlertTitle>
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </Label>
          <Input
            onChange={handleChangeField}
            id="email"
            type="email"
            name="email"
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
              name="password"
              onChange={handleChangeField}
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
              name="remember"
              checked={payload.rememberMe}
              onChange={handleCheckboxChange}
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
        disabled={isPending}
        onClick={onSubmit}
        className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer"
        style={{ backgroundColor: '#3F3FF3' }}
      >
        Log In
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Or Login With
          </span>
        </div>
      </div>

      <Button
        onClick={handleGoogleSignUp}
        variant="outline"
        className="w-full h-12 border-gray-200 hover:bg-gray-50 hover:text-gray-900 rounded-lg bg-white shadow-none cursor-pointer"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Google
      </Button>
    </>
  );
};

export default LoginForm;
