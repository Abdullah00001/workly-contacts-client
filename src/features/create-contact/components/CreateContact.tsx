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
    phone: '',
    worksAt: {
      companyName: null,
      jobTitle: null,
    },
  });
  const handleChangeBasicField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeWorksAt = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      worksAt: { ...prev.worksAt, [name]: value },
    }));
  };
  const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedValue =
      name === 'postCode'
        ? value === ''
          ? null
          : Number(value)
        : value === ''
          ? null
          : value;

    setPayload((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: updatedValue,
      },
    }));
  };

  const handleChangeBirthday = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedValue =
      name === 'day' || name === 'year'
        ? value === ''
          ? null
          : Number(value)
        : value === ''
          ? null
          : value;
    setPayload((prev) => ({
      ...prev,
      birthday: { ...prev.birthday, [name]: updatedValue },
    }));
  };
  return (
    <>
      <CreateContactHeader />
      <CreateContactForm payload={payload} setPayload={setPayload} />
    </>
  );
};

export default CreateContact;
