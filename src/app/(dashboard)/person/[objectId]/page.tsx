import ContactDetails from '@/features/contact-details/components/ContactDetails';
import { TContactDetailsPageProps } from '@/features/contact-details/types/type';
import { Metadata } from 'next';

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
