import { FC, lazy, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQuery } from '@tanstack/react-query';
import PersonalInfoPageSkeleton from '../components/ui/skeletons/PersonalInfoPageSkeleton';
import ErrorFallback from '../components/ui/ErrorFallback';
import AuthApis from '../apis/auth.apis';
const BasicInfo = lazy(
  () => import('../features/accountscenter/components/BasicInfo')
);
const AddressInfo = lazy(
  () => import('../features/accountscenter/components/AddressInfo')
);
const ContactInfo = lazy(
  () => import('../features/accountscenter/components/ContactInfo')
);

const { getFullProfile } = AuthApis;

const PersonalInfo: FC = () => {
  const { data, isPending } = useQuery({
    queryKey: ['personal_info'],
    queryFn: async () => await getFullProfile(),
  });
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
        {isPending ? (
          <PersonalInfoPageSkeleton />
        ) : (
          <Suspense fallback={<PersonalInfoPageSkeleton />}>
            <BasicInfo
              avatar={data?.data?.data?.avatar}
              dateOfBirth={data?.data?.data?.dateOfBirth}
              gender={data?.data?.data?.gender}
              name={data?.data?.data?.name}
              key={'basic_info'}
            />
            <ContactInfo
              email={data?.data?.data?.email}
              phone={data?.data?.data?.phone}
              key={'contact_info'}
            />
            <AddressInfo
              home={data?.data?.data?.location?.home}
              work={data?.data?.data?.location?.work}
              key={'address_info'}
            />
          </Suspense>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default PersonalInfo;
