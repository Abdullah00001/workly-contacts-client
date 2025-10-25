import Contacts from '@/features/dashboard/components/Contacts';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Overview of your Workly Contacts account. Access recent activity, favorite contacts, and manage your contacts efficiently from one place.',
  keywords: [
    'Workly Contacts dashboard',
    'contacts overview',
    'manage contacts',
    'recent activity',
    'favorite contacts',
    'contact management',
    'Workly Contacts',
  ],
  openGraph: {
    title: 'Dashboard | Workly Contacts',
    description:
      'Access your recent activity, favorite contacts, and manage all your contacts from the dashboard.',
    url: 'https://contacts.workly.ink/dashboard',
    siteName: 'Workly Contacts',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Dashboard | Workly Contacts',
    description:
      'Get a complete overview of your contacts and recent activity with Workly Contacts dashboard.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function page() {
  return (
    <section>
      <div className="px-4 mt-4">
        <Contacts />
      </div>
    </section>
  );
}
