'use client';

import { useState, type FC } from 'react';
import { TContactDetailsProps } from '../types/type';
import { useQuery } from '@tanstack/react-query';
import { RetrieveContactDetails } from '../service/contact-detail-service';
import ContactDetailsEdit from './ContactDetailsEdit';
import ContactDetailsInfo from './ContactDetailsInfo';

const ContactDetails: FC<TContactDetailsProps> = ({ objectId }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data, isPending } = useQuery({
    queryKey: ['contacts', objectId],
    queryFn: async () => await RetrieveContactDetails(objectId),
  });
  if (isPending) return null;
  if (isEdit)
    return <ContactDetailsEdit setIsEdit={setIsEdit} details={data} />;
  return <ContactDetailsInfo setIsEdit={setIsEdit} details={data} />;
};

export default ContactDetails;
