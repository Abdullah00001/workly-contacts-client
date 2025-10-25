import ActivityTable from '@/features/activity/components/ActivityTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activity | Workly Contacts',
  description:
    'View and monitor all your recent account activities in Workly Contacts. Stay informed about logins, password updates, and other important security events to keep your account safe.',
  keywords: [
    'Workly Contacts activity',
    'account activity',
    'recent account actions',
    'security events',
    'login history',
    'Workly Contacts security',
    'activity logs',
  ],
  openGraph: {
    title: 'Activity',
    description:
      'Keep track of your account activity in Workly Contacts — including logins, password changes, and other key security events.',
    url: 'https://contacts.workly.ink/account/activity',
    siteName: 'Workly Contacts',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Activity | Workly Contacts',
    description:
      'Check your recent activity logs in Workly Contacts. Monitor logins and security changes to ensure your account safety.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function page() {
  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="lg:w-[870px] mx-auto">
        <div className="py-4 px-4 lg:px-0">
          <p className="font-google-sans">
            Security activity and alerts from the last 28 days.
          </p>
        </div>
        <ActivityTable />
      </div>
    </div>
  );
}
