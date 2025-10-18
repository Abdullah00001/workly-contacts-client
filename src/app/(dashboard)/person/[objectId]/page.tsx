import ContactDetails from '@/features/contact-details/components/ContactDetails';
import { TContactDetailsPageProps } from '@/features/contact-details/types/type';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Details | Workly Contacts',
  description:
    'View, edit, and manage detailed information about your contacts on Workly Contacts. Keep all your professional and personal connections organized in one place.',
  keywords: [
    'Workly Contacts contact details',
    'edit contact',
    'view contact information',
    'manage contacts',
    'Workly Contacts',
    'contact management app',
    'update contact',
    'contact info page',
  ],
  openGraph: {
    title: 'Contact Details | Workly Contacts',
    description:
      'Access and manage detailed information about your contacts in Workly Contacts. View, edit, and organize with ease.',
    url: 'https://contacts.workly.ink/contact',
    siteName: 'Workly Contacts',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Details | Workly Contacts',
    description:
      'Manage and edit detailed information about your contacts on Workly Contacts with ease and efficiency.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function page({
  params,
  searchParams,
}: TContactDetailsPageProps) {
  const { objectId } = await params;
  const { edit } = await searchParams;
  return (
    <div className="w-full h-full">
      <ContactDetails objectId={objectId} isEditMode={edit === '1'} />
    </div>
  );
}
