import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import LoginForm from '@/features/auth/components/LoginForm';
import { Users } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Log in to your Workly Contacts account and manage your contacts effortlessly. Stay connected, organized, and secure.',
  keywords: [
    'Workly Contacts login',
    'contact management login',
    'CRM login',
    'access account',
    'secure contacts',
  ],
  openGraph: {
    title: 'Login | Workly Contacts',
    description:
      'Access your Workly Contacts dashboard to organize, manage, and sync your contacts efficiently.',
    url: 'https://contacts.workly.ink/auth/login',
    siteName: 'Workly Contacts',
    type: 'website',
    images: [
      {
        url: 'https://contacts.workly.ink/og-login.png',
        width: 1200,
        height: 630,
        alt: 'Workly Contacts Login',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login | Workly Contacts',
    description:
      'Securely log in to Workly Contacts and manage your contacts online with ease.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Login() {
  return (
    <div className="min-h-screen flex font-sans">
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ backgroundColor: '#3F3FF3' }}
      >
        <div className="relative z-10 flex flex-col justify-between w-full px-12 py-12">
          <Link href={'/'}>
            <div className="flex items-center space-x-3 cursor-pointer group ">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
                <Users className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-sm sm:text-2xl font-bold text-white">
                  Workly Contacts
                </h1>
                <p className="text-xs sm:text-sm text-white/80 -mt-1">
                  Contact Management
                </p>
              </div>
            </div>
          </Link>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl text-white mb-6 leading-tight">
              Keep your contacts organized, effortlessly.
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Log in to access your dashboard and manage stay connected.
            </p>
          </div>

          <div className="flex justify-between items-center text-white/70 text-sm">
            <span>Copyright © 2025 WORKLY INK.</span>
            <span className="cursor-pointer hover:text-white/90">
              <Link href={'/privacy'}>Privacy Policy</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-3 cursor-pointer group transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Workly Contacts
                </h1>
                <p className="text-xs text-gray-600 -mt-1">
                  Contact Management
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl text-foreground">Welcome Back</h2>
              <p className="text-muted-foreground">
                Enter your email and password to access your account.
              </p>
            </div>

            <LoginForm />

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
              Don{`'`}t Have An Account?{' '}
              <Link
                href="/auth/signup"
                className="text-sm hover:text-opacity-80 font-medium cursor-pointer underline-offset-4 hover:underline"
                style={{ color: '#3F3FF3' }}
              >
                Register Now.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
