import { TContactsLabelPageProps } from '@/features/contact-details/types/type';
import Labels from '@/features/dashboard/components/Labels';

export default async function page({ params }: TContactsLabelPageProps) {
  const { labelId } = await params;
  return (
    <section>
      <div className="px-4 mt-4">
        <Labels labelId={labelId} />
      </div>
    </section>
  );
}
