'use client';
import { type FC } from 'react';
import { TContactDetailsInfoProps } from '../types/type';
import ContactDetailsHeader from './ContactDetailsHeader';
import ContactDetailsAvatar from './ContactDetailsAvatar';
import ContactSummary from './ContactSummary';

const ContactDetailsInfo: FC<TContactDetailsInfoProps> = ({
  setIsEdit,
  details,
}) => {
  return (
    <>
      <ContactDetailsHeader setIsEdit={setIsEdit} details={details} />
      <ContactDetailsAvatar
        avatarUrl={details?.avatar?.url}
        setIsEdit={setIsEdit}
        firstName={details?.firstName}
        lastName={details?.lastName}
        companyName={details?.worksAt?.companyName}
        jobTitle={details?.worksAt?.jobTitle}
      />
      <ContactSummary
        birthday={details?.birthday}
        createdAt={details?.createdAt}
        email={details?.email}
        location={details?.location}
        phone={details?.phone}
        updatedAt={details?.updatedAt}
        setIsEdit={setIsEdit}
      />
    </>
  );
};

export default ContactDetailsInfo;
