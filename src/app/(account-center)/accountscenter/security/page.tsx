import SecurityAndPasswordSectionHolder from '@/features/account-center/components/SecurityAndPasswordSectionHolder';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security & Password',
  description:
    'Stay in control of your Workly Contacts account security. Review recent activity, manage active sessions, and update your password to keep your account safe.',
  keywords: [
    'Workly Contacts security',
    'account security',
    'password management',
    'active sessions',
    'recent activity',
    'account protection',
    'secure account',
  ],
  openGraph: {
    title: 'Security & Password | Workly Contacts',
    description:
      'Protect your Workly Contacts account. Manage your password, review security activity, and monitor your sessions all in one place.',
    url: 'https://contacts.workly.ink/security',
    siteName: 'Workly Contacts',
    type: 'website',
    images: [
      {
        url: 'https://contacts.workly.ink/og-security.png',
        width: 1200,
        height: 630,
        alt: 'Workly Contacts Security & Password Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security & Password | Workly Contacts',
    description:
      'Keep your Workly Contacts account secure. Manage passwords, sessions, and recent activity effortlessly.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SecurityAndPassword() {
  return (
    <div className="px-4 w-full scrollbar-hide">
      <div className="mt-4 w-auto">
        <h1 className="font-semibold text-[24px] text-wrap">
          Keep your Account safe and secure
        </h1>
        <p className="text-[16px]  text-wrap mt-1 font-normal text-gray-300">
          Update your password, monitor logged-in devices, and review recent
          activity to keep your account safe and under your control.
        </p>
      </div>
      <SecurityAndPasswordSectionHolder />
    </div>
  );
}
