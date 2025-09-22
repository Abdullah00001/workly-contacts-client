'use client';
import { ChangeEvent, FC, FormEvent } from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {
  TSignupPayload,
  TSignupPayloadError,
} from '@/features/auth/types/auth-types';
import {
  getPasswordStrength,
  SignupSchema,
} from '@/lib/validation/auth-validation';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { SignupService } from '../service/auth-service';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SignupForm: FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [payload, setPayload] = useState<TSignupPayload>({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [payloadErrors, setPayloadErrors] = useState<
    TSignupPayloadError | undefined
  >();
  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };
  const handleConfirmPasswordField = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };
  const passwordStrength = getPasswordStrength(payload.password);
  const passwordsMatch =
    payload.password === confirmPassword && confirmPassword !== '';
  const validateForm = (): boolean => {
    setPayloadErrors(undefined);
    const result = SignupSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: TSignupPayloadError = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof TSignupPayload;
        fieldErrors[field] = issue.message;
      });

      setPayloadErrors(fieldErrors);
      console.log(fieldErrors);
      return false;
    }
    return true;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: TSignupPayload) => await SignupService(payload),
    onSuccess: (data) => {
      window.location.href = '/auth/verify';
    },
    onError: (error) => {
      setServerError(error.message);
    },
  });
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
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
        <div className="mb-0">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </Label>
          <Input
            onChange={handleChangeField}
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            className="h-12 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
          />
          <p
            className={`${payloadErrors?.name ? 'visible' : 'invisible'} mt-1 text-red-500 text-xs`}
          >
            {payloadErrors?.name || 'a'}
          </p>
        </div>

        <div className="mb-0">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </Label>
          <Input
            onChange={handleChangeField}
            name="email"
            id="email"
            type="email"
            placeholder="user@company.com"
            className="h-12 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
          />
          <p
            className={`${payloadErrors?.email ? 'visible' : 'invisible'} mt-1 text-red-500 text-xs`}
          >
            {payloadErrors?.email || 'a'}
          </p>
        </div>

        <div className="mb-0">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              onChange={handleChangeField}
              id="password"
              name="password"
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
          {payload.password && (
            <div className="mt-2 md:mt-1">
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
          <p
            className={`${payloadErrors?.password ? 'visible' : 'invisible'} mt-1 text-red-500 text-xs`}
          >
            {payloadErrors?.password || 'a'}
          </p>
        </div>
        <div className="mb-0">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-foreground"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              onChange={handleConfirmPasswordField}
              className="h-12 pr-10 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
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
          <p
            className={`${confirmPassword && !passwordsMatch ? 'visible' : 'invisible'} mt-1 text-red-500 text-xs`}
          >
            {'Password Not Matched'}
          </p>
        </div>
      </div>

      <Button
        disabled={isPending}
        onClick={onSubmit}
        className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer"
        style={{ backgroundColor: '#3F3FF3' }}
      >
        Create Account
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Or Sign Up With
          </span>
        </div>
      </div>

      <Button
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

      <div className="text-center text-sm text-muted-foreground">
        Already Have An Account?{' '}
        <Link
          href="/auth/login"
          className="text-sm hover:text-opacity-80 font-medium cursor-pointer underline-offset-4 hover:underline"
          style={{ color: '#3F3FF3' }}
        >
          Sign In.
        </Link>
      </div>
    </>
  );
};

export default SignupForm;
