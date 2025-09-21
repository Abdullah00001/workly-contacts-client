import type { Metadata } from 'next';
import { Users } from 'lucide-react';
import Link from 'next/link';
import VerifyOtp from '@/features/auth/components/VerifyOtp';

export const metadata: Metadata = {
  title: 'Verify Account | Workly Contacts',
  description:
    'Verify your Workly Contacts account with the 6-digit code sent to your email. Complete your registration and start managing your contacts.',
  keywords: [
    'Workly Contacts verification',
    'account verification',
    'OTP verification',
    'email verification',
    'secure signup',
  ],
  openGraph: {
    title: 'Verify Account | Workly Contacts',
    description:
      'Complete your Workly Contacts registration by verifying your email address.',
    url: 'https://contacts.workly.ink/auth/verify',
    siteName: 'Workly Contacts',
    type: 'website',
    images: [
      {
        url: 'https://contacts.workly.ink/og-verify.png',
        width: 1200,
        height: 630,
        alt: 'Workly Contacts Account Verification',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verify Account | Workly Contacts',
    description:
      'Complete your account verification and start using Workly Contacts.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VerifyAccountPage() {
  const email = 'user@example.com';

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      <div className="lg:hidden absolute top-4 left-4 z-10">
        <Link href={'/'}>
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Workly Contacts
              </h1>
              <p className="text-xs text-gray-600 -mt-1">Contact Management</p>
            </div>
          </div>
        </Link>
      </div>

      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ backgroundColor: '#3F3FF3' }}
      >
        <div className="relative z-10 flex flex-col justify-between w-full px-12 py-12">
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

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl text-white mb-6 leading-tight">
              Almost there! Just one more step.
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Verify your email address to complete your account setup and start
              managing your contacts efficiently.
            </p>
          </div>

          <div className="flex justify-between items-center text-white/70 text-sm">
            <span>Copyright © 2025 WORKLY INK.</span>
            <div className="flex space-x-4">
              <Link
                href={'/privacy'}
                className="hover:text-white/90 transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center min-h-screen lg:h-auto p-4 lg:p-8 bg-white">
        <div className="w-full max-w-md space-y-6 lg:space-y-8 sm:max-w-lg sm:border sm:border-gray-200 sm:rounded-xl sm:p-8 sm:shadow-sm lg:border-0 lg:shadow-none lg:p-0">
          <VerifyOtp email={email} />
        </div>

        <div className="lg:hidden absolute bottom-4 left-0 right-0">
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <Link
              href={'/privacy'}
              className="hover:text-gray-700 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href={'/terms'}
              className="hover:text-gray-700 transition-colors"
            >
              Terms
            </Link>
            <Link
              href={'/help'}
              className="hover:text-gray-700 transition-colors"
            >
              Help
            </Link>
            <Link
              href={'/contact'}
              className="hover:text-gray-700 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
