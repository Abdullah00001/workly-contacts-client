import ContactDetails from '@/features/contact-details/components/ContactDetails';
import { TContactDetailsPageProps } from '@/features/contact-details/types/type';
import { Metadata } from 'next';

export default async function page({ params }: TContactDetailsPageProps) {
  const { objectId } = await params;
  return (
    <div className="w-full h-full">
      <ContactDetails objectId={objectId} />
    </div>
  );
}
