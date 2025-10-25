import CommonHeader from '@/components/common/CommonHeader';
import { SessionAlert } from '@/features/auth/components/SessionAlert';
import SessionContainer from '@/features/auth/components/SessionContainer';
import { checkClearSessionPageAccess } from '@/features/auth/lib/auth-guard';
import { RetrieveSessionsForClearService } from '@/features/auth/service/session-data';
import { TSession } from '@/features/auth/types/auth-types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clear Sessions',
  description:
    'Manage and clear your active sessions to continue logging in to your Workly Contacts account securely.',
  keywords: [
    'Workly Contacts clear sessions',
    'remove active sessions',
    'session management',
    'account security',
    'limit exceeded login',
  ],
  openGraph: {
    title: 'Clear Sessions | Workly Contacts',
    description:
      'Too many sessions active? Clear unnecessary sessions to continue logging in and keep your Workly Contacts account secure.',
    url: 'https://contacts.workly.ink/auth/clear-sessions',
    siteName: 'Workly Contacts',
    type: 'website',
    images: [
      {
        url: 'https://contacts.workly.ink/og-clear-sessions.png',
        width: 1200,
        height: 630,
        alt: 'Workly Contacts Clear Sessions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clear Sessions | Workly Contacts',
    description:
      'Clear active sessions to regain access and continue logging in to Workly Contacts securely.',
  },
  robots: {
    index: false, // 🔒 better to keep this private and non-indexable
    follow: false,
  },
};

export default async function ClearSession() {
  await checkClearSessionPageAccess();
  const { data: sessionList } = await RetrieveSessionsForClearService();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <CommonHeader />
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <div className="space-y-6">
          <SessionAlert />
          <SessionContainer sessionList={sessionList as TSession[]} />
        </div>
      </main>
    </div>
  );
}
