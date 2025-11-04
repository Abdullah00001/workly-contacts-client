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

      <div className="w-full lg:w-1/2 flex flex-col bg-white">
        <div className="lg:hidden px-6 py-4 border-b border-gray-100">
          <Link href={'/'}>
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Workly Contacts
                </h1>
                <p className="text-xs text-gray-600 -mt-1">
                  Contact Management
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl text-foreground">Welcome Back</h2>
                <p className="text-muted-foreground">
                  Enter your email and password to access your account.
                </p>
              </div>

              <LoginForm />
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
    </div>
  );
}
