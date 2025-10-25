'use client';

import { useEffect, useState } from 'react';

const UpdateContactFormSkeleton = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 769);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const AvatarSkeleton = () => (
    <div className="flex-1 create-contact-header-avatar-container-for-large-screen">
      <div className="flex create-contact-header-avatar-positioning-for-large-screen justify-center items-center">
        <div className="create-contact-header-avatar-width-for-large-screen w-[100px] h-[100px] relative">
          <div className="w-full h-full rounded-full bg-gray-200 animate-pulse" />
          <div className="absolute cursor-pointer create-contact-header-avatar-plus-outer-for-large-screen flex w-[42px] h-[42px] top-15 right-0 items-center justify-center bg-white rounded-full">
            <div className="create-contact-header-avatar-plus-inner-for-large-screen w-[36px] h-[36px] flex items-center justify-center bg-gray-300 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );

  const NameSkeleton = () => {
    if (isMobile) {
      return (
        <div className="flex-1 px-4">
          <div className="flex items-start justify-start">
            <div className="flex-[2.6%]">
              <div className="w-10 h-10 flex justify-center items-center">
                <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse" />
              </div>
            </div>
            <div className="flex-[90%]">
              <div className="flex flex-col justify-start items-start gap-3">
                <div className="w-full h-10 rounded-[4px] bg-gray-200 animate-pulse" />
                <div className="w-full h-10 rounded-[4px] bg-gray-200 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="pl-10">
        <div className="flex justify-start items-start gap-4">
          <div className="w-10 h-10 flex justify-center items-center">
            <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse" />
          </div>
          <div className="flex flex-col justify-start items-start gap-3">
            <div className="w-[520px] h-10 rounded-[4px] bg-gray-200 animate-pulse" />
            <div className="w-[520px] h-10 rounded-[4px] bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
    );
  };

  const JobInfoSkeleton = () => {
    if (isMobile) {
      return (
        <div className="flex-1 px-4">
          <div className="flex items-start justify-start">
            <div className="flex-[2.6%]">
              <div className="w-10 h-10 flex justify-center items-center">
                <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse" />
              </div>
            </div>
            <div className="flex-[90%]">
              <div className="flex flex-col justify-start items-start gap-3">
                <div className="w-full h-10 rounded-[4px] bg-gray-200 animate-pulse" />
                <div className="w-full h-10 rounded-[4px] bg-gray-200 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="pl-10">
        <div className="flex justify-start items-start gap-4">
          <div className="w-10 h-10 flex justify-center items-center">
            <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse" />
          </div>
          <div className="flex flex-col justify-start items-start gap-3">
            <div className="w-[520px] h-10 rounded-[4px] bg-gray-200 animate-pulse" />
            <div className="w-[520px] h-10 rounded-[4px] bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
    );
  };

  const SingleFieldSkeleton = () => {
    if (isMobile) {
      return (
        <div className="flex-1 px-4">
          <div className="flex items-start justify-start">
            <div className="flex-[2.6%]">
              <div className="w-10 h-10 flex justify-center items-center" />
            </div>
            <div className="flex-[90%]">
              <div className="w-full h-10 rounded-[20px] bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="pl-10 w-full">
        <div className="flex justify-start items-center gap-4">
          <div className="w-10" />
          <div className="h-10 w-[520px] rounded-[20px] bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  };

  const PhoneSkeleton = () => {
    if (isMobile) {
      return (
        <div className="flex-1 px-4">
          <div className="flex items-start justify-start">
            <div className="flex-[2.6%]">
              <div className="w-10 h-10 flex justify-center items-center" />
            </div>
            <div className="flex-[90%]">
              <div className="w-full h-10 rounded-[20px] bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="pl-10 w-full">
        <div className="flex justify-start items-center gap-4">
          <div className="w-10" />
          <div className="h-10 w-[520px] rounded-[20px] bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  };

  const AddressSkeleton = () => {
    if (isMobile) {
      return (
        <div className="flex-1 px-4">
          <div className="flex items-start justify-start">
            <div className="flex-[2.6%]">
              <div className="w-10 h-10 flex justify-center items-center" />
            </div>
            <div className="flex-[90%]">
              <div className="w-full h-10 rounded-[20px] bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="pl-10 w-full">
        <div className="flex justify-start items-center gap-4">
          <div className="w-10" />
          <div className="h-10 w-[520px] rounded-[20px] bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  };

  const BirthdaySkeleton = () => {
    if (isMobile) {
      return (
        <div className="flex-1 px-4">
          <div className="flex items-start justify-start">
            <div className="flex-[2.6%]">
              <div className="w-10 h-10 flex justify-center items-center" />
            </div>
            <div className="flex-[90%]">
              <div className="w-full h-10 rounded-[20px] bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="pl-10 w-full">
        <div className="flex justify-start items-center gap-4">
          <div className="w-10" />
          <div className="h-10 w-[520px] rounded-[20px] bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  };

  return (
    <div className="mt-2 w-full pb-10">
      <div className="w-full flex flex-col gap-5">
        <AvatarSkeleton />
        <NameSkeleton />
        <JobInfoSkeleton />
        <SingleFieldSkeleton />
        <PhoneSkeleton />
        <AddressSkeleton />
        <BirthdaySkeleton />
      </div>
    </div>
  );
};

export default UpdateContactFormSkeleton;
