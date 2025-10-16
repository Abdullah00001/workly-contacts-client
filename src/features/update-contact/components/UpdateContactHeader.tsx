'use client';
import Icon from '@/components/common/Icon';
import { useRouter } from 'next/navigation';
import { useEffect, type FC, type FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const UpdateContactHeader: FC = () => {
  const disabled = false;
  const router = useRouter();
  // const { isPending, mutate } = useMutation({
  //   mutationFn: async (payload: TContact) => await CreateContact(payload),
  //   onSuccess: (data) => {
  //     setPayload({
  //       avatar: { publicId: null, url: null },
  //       birthday: {
  //         day: null,
  //         month: '',
  //         year: null,
  //       },
  //       email: '',
  //       firstName: '',
  //       lastName: '',
  //       location: {
  //         city: null,
  //         country: null,
  //         postCode: null,
  //         streetAddress: null,
  //       },
  //       phone: {
  //         countryCode: '',
  //         number: '',
  //       },
  //       worksAt: {
  //         companyName: null,
  //         jobTitle: null,
  //       },
  //     });
  //     toast('Contact Created', {
  //       closeButton: false,
  //       position: 'bottom-center',
  //     });
  //     setTimeout(() => {
  //       router.push('/dashboard');
  //     }, 1000);
  //   },
  //   onError: (error) => {
  //     if (error instanceof AxiosError) {
  //       toast.error(error.response?.data?.message, {
  //         closeButton: false,
  //         position: 'bottom-center',
  //       });
  //     }
  //     toast.error('Contact creation failed,Try Again!', {
  //       closeButton: false,
  //       position: 'bottom-center',
  //     });
  //   },
  // });
  // const handleSave = (e: FormEvent) => {
  //   e.preventDefault();
  //   mutate(payload);
  // };
  // useEffect(() => {
  //   if (isPending) {
  //     toast('Working...', {
  //       closeButton: false,
  //       position: 'bottom-center',
  //     });
  //   }
  // }, [isPending]);
  return (
    <div className="pt-6 create-contact-header-padding-for-large-screen px-2">
      <div className="flex justify-between items-center w-full">
        <div
          onClick={() => router.back()}
          className="w-12 h-12 flex justify-center items-center"
        >
          <div className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center">
            <Icon
              name="arrow_back"
              size={24}
              variant="outlined"
              type="icons"
              className="text-[#444746]"
            />
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            className={`h-10 px-6 cursor-pointer rounded-[24px] ${disabled ? 'bg-[#e4e4e4] text-[#9f9f9f]' : 'text-white bg-[#0b57d0]'}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateContactHeader;
