'use client';

import { type FC } from 'react';
import CreateContactAvatar from './CreateContactAvatar';
import CreateContactName from './CreateContactName';
import CreateContactJobInformation from './CreateContactJobInformation';
import CreateContactEmail from './CreateContactEmail';
import CreateContactPhone from './CreateContactPhone';
import CreateContactAddress from './CreateContactAddress';
import CreateContactBirthday from './CreateContactBirthday';
import { TCreateContactFormProps } from '../types/type';

const CreateContactForm: FC<TCreateContactFormProps> = ({
  payload,
  setPayload,
}) => {
  return (
    <div className="mt-2 w-full pb-10">
      <div className="w-full flex flex-col gap-5">
        <CreateContactAvatar payload={payload} setPayload={setPayload} />
        <CreateContactName />
        <CreateContactJobInformation />
        <CreateContactEmail />
        <CreateContactPhone />
        <CreateContactAddress />
        <CreateContactBirthday />
      </div>
    </div>
  );
};

export default CreateContactForm;
