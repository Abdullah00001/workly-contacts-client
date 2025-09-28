'use client';
import ContactTable from '@/components/common/ContactTable';
import type { FC } from 'react';

const Contacts: FC = () => {
  const contacts = [
    {
      objectId: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '+1-202-555-0171',
      avatar: null,
    },
    {
      objectId: '2',
      name: 'Michael Smith',
      email: 'michael.smith@example.com',
      phone: '+1-202-555-0132',
      avatar: null,
    },
    {
      objectId: '3',
      name: 'Sophia Brown',
      email: 'sophia.brown@example.com',
      phone: '+1-202-555-0189',
      avatar: null,
    },
    {
      objectId: '4',
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      phone: '+1-202-555-0114',
      avatar: null,
    },
    {
      objectId: '5',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      phone: '+1-202-555-0178',
      avatar: null,
    },
    {
      objectId: '6',
      name: 'William Martinez',
      email: 'william.martinez@example.com',
      phone: '+1-202-555-0147',
      avatar: null,
    },
    {
      objectId: '7',
      name: 'Olivia Garcia',
      email: 'olivia.garcia@example.com',
      phone: '+1-202-555-0163',
      avatar: null,
    },
    {
      objectId: '8',
      name: 'Benjamin Lee',
      email: 'benjamin.lee@example.com',
      phone: '+1-202-555-0194',
      avatar: null,
    },
    {
      objectId: '9',
      name: 'Ava Thompson',
      email: 'ava.thompson@example.com',
      phone: '+1-202-555-0126',
      avatar: null,
    },
    {
      objectId: '10',
      name: 'Daniel White',
      email: 'daniel.white@example.com',
      phone: '+1-202-555-0108',
      avatar: null,
    },
    {
      objectId: '11',
      name: 'Isabella Harris',
      email: 'isabella.harris@example.com',
      phone: '+1-202-555-0198',
      avatar: null,
    },
    {
      objectId: '12',
      name: 'Henry Clark',
      email: 'henry.clark@example.com',
      phone: '+1-202-555-0173',
      avatar: null,
    },
    {
      objectId: '13',
      name: 'Mia Lewis',
      email: 'mia.lewis@example.com',
      phone: '+1-202-555-0149',
      avatar: null,
    },
    {
      objectId: '14',
      name: 'Alexander Walker',
      email: 'alexander.walker@example.com',
      phone: '+1-202-555-0121',
      avatar: null,
    },
    {
      objectId: '15',
      name: 'Charlotte Hall',
      email: 'charlotte.hall@example.com',
      phone: '+1-202-555-0169',
      avatar: null,
    },
    {
      objectId: '16',
      name: 'Ethan Young',
      email: 'ethan.young@example.com',
      phone: '+1-202-555-0199',
      avatar: null,
    },
    {
      objectId: '17',
      name: 'Amelia King',
      email: 'amelia.king@example.com',
      phone: '+1-202-555-0119',
      avatar: null,
    },
    {
      objectId: '18',
      name: 'Matthew Wright',
      email: 'matthew.wright@example.com',
      phone: '+1-202-555-0135',
      avatar: null,
    },
    {
      objectId: '19',
      name: 'Harper Scott',
      email: 'harper.scott@example.com',
      phone: '+1-202-555-0186',
      avatar: null,
    },
    {
      objectId: '20',
      name: 'Jack Green',
      email: 'jack.green@example.com',
      phone: '+1-202-555-0128',
      avatar: null,
    },
  ];
  return (
    <>
      <div className="pl-2 pt-3 flex gap-2 items-center justify-start">
        <h1 className="font-google-sans text-[#444746] text-2xl font-normal">
          Contacts
        </h1>
        <span className="font-google-sans-text text-sm font-medium text-[#444746]">
          (22)
        </span>
      </div>
      <ContactTable contacts={contacts} />
    </>
  );
};

export default Contacts;
