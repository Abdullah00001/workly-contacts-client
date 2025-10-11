'use client';

import React from 'react';
import CreateContactAvatar from './CreateContactAvatar';
import CreateContactName from './CreateContactName';
import CreateContactJobInformation from './CreateContactJobInformation';
import CreateContactEmail from './CreateContactEmail';
import CreateContactPhone from './CreateContactPhone';
import CreateContactAddress from './CreateContactAddress';

const CreateContactForm = () => {
  return (
    <div className="mt-2 w-full pb-10">
      <div className="w-full flex flex-col gap-5">
        <CreateContactAvatar />
        <CreateContactName />
        <CreateContactJobInformation />
        <CreateContactEmail />
        <CreateContactPhone />
        <CreateContactAddress />
      </div>
    </div>
  );
};

export default CreateContactForm;
