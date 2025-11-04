import { Users } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import AccountUnlockClient from '@/features/auth/components/AccountUnlockClient';

export const metadata: Metadata = {
  title: 'Account Activation',
  description:
    'Securely change your Workly Contacts account password to unlock your account. Follow our secure process to set a new password and regain full access.',
  keywords: [
    'Workly Contacts change password',
    'unlock account',
    'reset password',
    'secure password change',
    'account security',
    'contact management security',
  ],
  openGraph: {
    title: 'Change Password | Workly Contacts',
    description:
      'Securely change your Workly Contacts password and unlock your account. Protect your contacts with a strong new password.',
    url: 'https://contacts.workly.ink/auth/activation/change',
    siteName: 'Workly Contacts',
    type: 'website',
    images: [
      {
        url: 'https://contacts.workly.ink/og-change-password.png',
        width: 1200,
        height: 630,
        alt: 'Workly Contacts Change Password',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Change Password | Workly Contacts',
    description:
      'Securely change your Workly Contacts password and unlock your account.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface AccountUnlockPageProps {
  params: Promise<{ uuid: string }>;
}

export default async function AccountUnlock({
  params,
}: AccountUnlockPageProps) {
  const { uuid } = await params;

  return (
    <div className="min-h-screen flex font-sans">
      {/* Desktop Left Section */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ backgroundColor: '#3F3FF3' }}
      >
        <div className="relative z-10 flex flex-col justify-between w-full px-12 py-12">
          {/* Logo */}
          <Link href={'/'}>
            <div className="flex items-center space-x-3 cursor-pointer group">
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

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl text-white mb-6 leading-tight font-bold">
              Unlock your account securely.
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Create a strong new password to regain full access to your Workly
              Contacts account and manage your contacts with confidence.
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

      {/* Right Section / Mobile - Fixed height management for mobile viewport */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white lg:min-h-screen h-screen lg:h-auto">
        {/* Mobile Header */}
        <div className="lg:hidden px-6 py-4 border-b border-gray-100 flex-shrink-0">
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

        {/* Form Section - Use flex-1 to take available space, overflow-y-auto for scrolling only when needed */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8">
            <div className="w-full max-w-md">
              <Suspense fallback={<div></div>}>
                <AccountUnlockClient uuid={uuid} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
