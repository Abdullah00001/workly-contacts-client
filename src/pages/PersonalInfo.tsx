import { FC } from 'react';
import BasicInfo from '../features/accountscenter/components/BasicInfo';
import AddressInfo from '../features/accountscenter/components/AddressInfo';
import ContactInfo from '../features/accountscenter/components/ContactInfo';

const PersonalInfo: FC = () => {
  return (
    <div className="px-4 min-h-screen">
      <div className="mt-4 w-auto">
        <h1 className="font-semibold text-[24px] text-wrap">
          Your Profile Info In Amar Contacts <br className="hidden xs:block" />
          For Your Identity
        </h1>
        <p className="text-[16px]  text-wrap mt-1 font-normal text-gray-300">
          Manage and update your personal details in Amar Contacts. This
          information helps verify and personalize your experience.
        </p>
      </div>
      <BasicInfo />
      <ContactInfo/>
      <AddressInfo />
    </div>
  );
};

export default PersonalInfo;
