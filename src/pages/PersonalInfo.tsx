import { FC, lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PersonalInfoPageSkeleton from '../components/ui/skeletons/PersonalInfoPageSkeleton';
import ErrorFallback from '../components/ui/ErrorFallback';
const BasicInfo = lazy(
  () => import('../features/accountscenter/components/BasicInfo')
);
const AddressInfo = lazy(
  () => import('../features/accountscenter/components/AddressInfo')
);
const ContactInfo = lazy(
  () => import('../features/accountscenter/components/ContactInfo')
);

const PersonalInfo: FC = () => {
  return (
    <div className="px-4 min-h-screen w-full">
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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<PersonalInfoPageSkeleton />}>
          <BasicInfo />
          <ContactInfo />
          <AddressInfo />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default PersonalInfo;
