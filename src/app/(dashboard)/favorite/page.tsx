import Favorite from '@/features/dashboard/components/Favorite';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favorite Contacts',
  description:
    'View and manage your favorite contacts in Workly Contacts. Keep your most important contacts organized and easily accessible.',
  keywords: [
    'Workly Contacts favorite',
    'favorite contacts',
    'contact management',
    'manage contacts',
    'Workly Contacts',
    'important contacts',
    'starred contacts',
  ],
  openGraph: {
    title: 'Favorite Contacts',
    description:
      'Easily access and manage your favorite contacts in your Workly Contacts account.',
    url: 'https://contacts.workly.ink/favorites',
    siteName: 'Workly Contacts',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Favorite Contacts | Workly Contacts',
    description:
      'Keep your most important contacts organized and accessible with Workly Contacts.',
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
        <Favorite />
      </div>
    </section>
  );
}
