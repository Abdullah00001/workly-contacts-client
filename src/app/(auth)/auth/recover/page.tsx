import { Users } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ForgotPasswordClient from '@/features/auth/components/ForgotPasswordClient';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description:
    'Recover your Workly Contacts account by securely resetting your password. Follow the step-by-step process to regain access to your contacts and continue managing them safely.',
  keywords: [
    'Workly Contacts password reset',
    'forgot password',
    'recover account',
    'reset Workly Contacts login',
    'secure password reset',
    'contact management recovery',
  ],
  openGraph: {
    title: 'Forgot Password | Workly Contacts',
    description:
      'Reset your Workly Contacts password securely and regain access to your account. Continue managing, organizing, and protecting your contacts with ease.',
    url: 'https://contacts.workly.ink/auth/forgot-password',
    siteName: 'Workly Contacts',
    type: 'website',
    images: [
      {
        url: 'https://contacts.workly.ink/og-forgot-password.png',
        width: 1200,
        height: 630,
        alt: 'Workly Contacts Forgot Password',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forgot Password | Workly Contacts',
    description:
      'Securely reset your Workly Contacts password and recover access to your account.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Recover() {
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
              Reset your password securely.
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Follow our secure multi-step process to regain access to your
              account.
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
            <ForgotPasswordClient />
          </div>
        </div>
      </div>
    </div>
  );
}
