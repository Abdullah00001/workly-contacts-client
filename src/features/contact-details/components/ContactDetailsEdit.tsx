'use client';

import { Suspense, lazy, useEffect, useState, type FC } from 'react';
import { TContactDetailsEditProps } from '../types/type';
import { TUpdateContactDetails } from '@/features/update-contact/types/type';
import UpdateContactHeader from '@/features/update-contact/components/UpdateContactHeader';
import UpdateContactFormSkeleton from '@/features/update-contact/components/UpdateContactFormSkeleton';
const UpdateContactForm = lazy(
  () => import('@/features/update-contact/components/UpdateContactForm')
);

const ContactDetailsEdit: FC<TContactDetailsEditProps> = ({
  setIsEdit,
  details,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [payload, setPayload] = useState<TUpdateContactDetails>({
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
  useEffect(() => {
    setIsLoading(true);
    const {
      avatar,
      birthday,
      email,
      firstName,
      lastName,
      location,
      phone,
      worksAt,
    } = details;
    setPayload({
      avatar,
      birthday,
      email,
      firstName,
      lastName,
      location,
      phone,
      worksAt,
    });
    setTimeout(() => setIsLoading(false), 100);
  }, [details]);
  return (
    <div className="h-full w-full">
      <div className="create-contact-header-width-for-large-screen w-full h-full">
        <UpdateContactHeader />
        <Suspense fallback={<UpdateContactFormSkeleton />}>
          {isLoading ? (
            <UpdateContactFormSkeleton />
          ) : (
            <UpdateContactForm payload={payload} setPayload={setPayload} />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default ContactDetailsEdit;
