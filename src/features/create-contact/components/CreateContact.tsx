'use client';
import CreateContactForm from '@/features/create-contact/components/CreateContactForm';
import CreateContactHeader from '@/features/create-contact/components/CreateContactHeader';

import { ChangeEvent, useState, type FC } from 'react';
import { TContact } from '../types/type';

const CreateContact: FC = () => {
  const [payload, setPayload] = useState<TContact>({
    avatar: { publicId: null, url: null },
    birthday: {
      day: null,
      month: '',
      year: null,
    },
    email: '',
    firstName: '',
    lastName: '',
    location: {
      city: null,
      country: null,
      postCode: null,
      streetAddress: null,
    },
    phone: {
      countryCode: '',
      number: '',
    },
    worksAt: {
      companyName: null,
      jobTitle: null,
    },
  });
  return (
    <>
      <CreateContactHeader payload={payload} setPayload={setPayload} />
      <CreateContactForm payload={payload} setPayload={setPayload} />
    </>
  );
};

export default CreateContact;
