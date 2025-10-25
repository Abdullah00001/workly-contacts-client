import CreateContact from '@/features/create-contact/components/CreateContact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create New Contact',
  description:
    'Add a new contact to your Workly Contacts account quickly and easily. Manage your contacts efficiently with our intuitive platform.',
  keywords: [
    'Workly Contacts add contact',
    'create new contact',
    'contact management',
    'manage contacts',
    'Workly Contacts',
    'contact list',
    'add contact online',
  ],
  openGraph: {
    title: 'Create New Contact',
    description:
      'Easily create a new contact in your Workly Contacts account and keep your contacts organized.',
    url: 'https://contacts.workly.ink/new',
    siteName: 'Workly Contacts',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Create New Contact | Workly Contacts',
    description:
      'Quickly add a new contact to your Workly Contacts account and manage your contacts efficiently.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function page() {
  return (
    <div className="h-full w-full">
      <div className="create-contact-header-width-for-large-screen w-full h-full">
        <CreateContact />
      </div>
    </div>
  );
}
