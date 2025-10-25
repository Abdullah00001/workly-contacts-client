import Trash from '@/features/dashboard/components/Trash';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trash | Workly Contacts',
  description:
    'View and restore deleted contacts from your Workly Contacts trash. Manage removed contacts safely and recover them anytime.',
  keywords: [
    'Workly Contacts trash',
    'deleted contacts',
    'restore contacts',
    'recover deleted contacts',
    'contact management',
    'Workly Contacts',
    'recycle bin',
  ],
  openGraph: {
    title: 'Trash | Workly Contacts',
    description:
      'Easily view and restore deleted contacts from your Workly Contacts trash folder.',
    url: 'https://contacts.workly.ink/trash',
    siteName: 'Workly Contacts',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Trash | Workly Contacts',
    description:
      'Access your deleted contacts and restore them easily from the Workly Contacts trash.',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function page() {
  return (
    <div className="w-full h-full">
      <Trash />
    </div>
  );
}
