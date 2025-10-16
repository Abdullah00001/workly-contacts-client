'use client';

import { type FC } from 'react';
import { TUpdateContactForm } from '../types/type';
import UpdateContactAvatar from './UpdateContactAvatar';
import UpdateContactName from './UpdateContactName';
import UpdateContactJobInformation from './UpdateContactJobInformation';
import UpdateContactEmail from './UpdateContactEmail';
import UpdateContactPhone from './UpdateContactPhone';
import UpdateContactAddress from './UpdateContactAddress';
import UpdateContactBirthday from './UpdateContactBirthday';

const UpdateContactForm: FC<TUpdateContactForm> = ({ payload, setPayload }) => {
  return (
    <div className="mt-2 w-full pb-10">
      <div className="w-full flex flex-col gap-5">
        <UpdateContactAvatar payload={payload} setPayload={setPayload} />
        <UpdateContactName payload={payload} setPayload={setPayload} />
        <UpdateContactJobInformation
          payload={payload}
          setPayload={setPayload}
        />
        <UpdateContactEmail payload={payload} setPayload={setPayload} />
        <UpdateContactPhone payload={payload} setPayload={setPayload} />
        <UpdateContactAddress payload={payload} setPayload={setPayload} />
        <UpdateContactBirthday payload={payload} setPayload={setPayload} />
      </div>
    </div>
  );
};

export default UpdateContactForm;
