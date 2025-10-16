'use client';

import { useEffect, type FC } from 'react';
import { TContactDetailsProps } from '../types/type';
import { useQuery } from '@tanstack/react-query';
import { RetrieveContactDetails } from '../service/contact-detail-service';
import ContactDetailsEdit from './ContactDetailsEdit';
import ContactDetailsInfo from './ContactDetailsInfo';
import WorklyLoader from '@/components/common/WorklyLoader';
import { useRouter } from 'next/navigation';

const ContactDetails: FC<TContactDetailsProps> = ({ objectId, isEditMode }) => {
  const router = useRouter();
  const { data, isPending } = useQuery({
    queryKey: ['contacts', objectId],
    queryFn: async () => await RetrieveContactDetails(objectId),
  });

  useEffect(() => {
    if (!isPending && data?.isTrashed === true) router.push('/dashboard');
  }, [isPending, data]);
  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <WorklyLoader size="medium" text="Loading contact..." />
        </div>
      </div>
    );
  if (isEditMode)
    return <ContactDetailsEdit details={data} />;
  return <ContactDetailsInfo  details={data} />;
};

export default ContactDetails;
