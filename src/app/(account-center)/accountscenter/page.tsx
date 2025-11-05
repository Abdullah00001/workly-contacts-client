import PersonalInfoSectionHolder from '@/features/account-center/components/PersonalInfoSectionHolder';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Center',
  description:
    'Welcome to your Workly Contacts Account Center. Manage your personal information, review your security, and keep your account safe in one place.',
  keywords: [
    'Workly Contacts account center',
    'manage account',
    'account settings',
    'personal info',
    'account security',
    'update details',
  ],
  openGraph: {
    title: 'Account Center | Workly Contacts',
    description:
      'Easily manage your Workly Contacts account. Update your personal information, review your security, and control your account settings.',
    url: 'https://contacts.workly.ink/accountcenter',
    siteName: 'Workly Contacts',
    type: 'website',
    images: [
      {
        url: 'https://contacts.workly.ink/og-accountcenter.png',
        width: 1200,
        height: 630,
        alt: 'Workly Contacts Account Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Account Center | Workly Contacts',
    description:
      'Manage your Workly Contacts account with ease. Update details, review security, and keep your account safe.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AccountsCenter() {
  return (
    <div className="px-4 w-full">
      <div className="mt-4 w-auto">
        <h1 className="font-semibold text-[24px] text-wrap">
          Your Profile Info In Workly Contacts{' '}
          <br className="hidden xs:block" />
          For Your Identity
        </h1>
        <p className="text-[16px]  text-wrap mt-1 font-normal text-gray-300">
          Manage and update your personal details in Workly Contacts. This
          information helps verify and personalize your experience.
        </p>
      </div>
      <PersonalInfoSectionHolder />
    </div>
  );
}
