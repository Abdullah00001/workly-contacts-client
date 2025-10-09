'use client';
import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

const ActivityPageTitle: FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const handleGoBack = () => {
    if (window.history.length > 1) router.back();
    else router.push('/account/security');
  };
  const isActivityRoot = pathName === '/activity';
  return (
    <div className="w-full border-b py-2 bg-[#152127]">
      <div className="lg:w-[870px] mx-auto">
        <div className="flex justify-start items-center w-full">
          <div className="flex items-center justify-start">
            <button
              onClick={handleGoBack}
              className="w-[48px] h-[48px] flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft />
            </button>
            {isActivityRoot && (
              <h1 className="text-2xl font-google-sans">Security activity</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPageTitle;
