'use client';
import { type FC } from 'react';
import { TContactDetailsInfoProps } from '../types/type';
import ContactDetailsHeader from './ContactDetailsHeader';
import ContactDetailsAvatar from './ContactDetailsAvatar';
import ContactSummary from './ContactSummary';

const ContactDetailsInfo: FC<TContactDetailsInfoProps> = ({ details }) => {
  return (
    <>
      <ContactDetailsHeader details={details} />
      <ContactDetailsAvatar
        avatarUrl={details?.avatar?.url}
        _id={details?._id}
        firstName={details?.firstName}
        lastName={details?.lastName}
        companyName={details?.worksAt?.companyName}
        jobTitle={details?.worksAt?.jobTitle}
      />
      <ContactSummary
        _id={details?._id}
        birthday={details?.birthday}
        createdAt={details?.createdAt}
        email={details?.email}
        location={details?.location}
        phone={details?.phone}
        updatedAt={details?.updatedAt}
      />
    </>
  );
};

export default ContactDetailsInfo;
