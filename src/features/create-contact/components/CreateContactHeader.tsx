'use client';
import Icon from '@/components/common/Icon';
import { useRouter } from 'next/navigation';
import { useEffect, type FC, type FormEvent } from 'react';
import { TContact, TFieldComponentProps } from '../types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateContact } from '../services/create-contact-service';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { isPayloadChanged } from '../helpers/create-contact-helper';
import { navigationGuardStore } from '@/stores/navigation-guard-store';

const CreateContactHeader: FC<TFieldComponentProps> = ({
  payload,
  setPayload,
}) => {
  const queryClient = useQueryClient();
  const { setUnsavedChanges, setNextRoute, setModalOpen } =
    navigationGuardStore();
  const disabled = payload.firstName === '' && payload.lastName === '';
  const changed = isPayloadChanged(payload);
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: TContact) => await CreateContact(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setPayload({
        avatar: { publicId: null, url: null },
        birthday: {
          day: null,
          month: '',
          year: null,
        },
        email: '',
        firstName: '',
        lastName: '',
        location: {
          city: null,
          country: null,
          postCode: null,
          streetAddress: null,
        },
        phone: {
          countryCode: '',
          number: '',
        },
        worksAt: {
          companyName: null,
          jobTitle: null,
        },
      });
      toast('Contact Created', {
        closeButton: false,
        position: 'bottom-center',
      });
      setUnsavedChanges(false);
      setTimeout(() => {
        router.push(`/person/${data._id}`);
      }, 1000);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message, {
          closeButton: false,
          position: 'bottom-center',
        });
      }
      toast.error('Contact creation failed,Try Again!', {
        closeButton: false,
        position: 'bottom-center',
      });
    },
  });
  const handleBack = () => {
    if (changed) {
      // show discard modal globally
      setNextRoute('back'); // special flag for back navigation
      setModalOpen(true);
    } else {
      router.back();
    }
  };
  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    mutate(payload);
  };
  useEffect(() => {
    setUnsavedChanges(changed);
  }, [changed, setUnsavedChanges]);
  useEffect(() => {
    if (isPending) {
      toast('Working...', {
        closeButton: false,
        position: 'bottom-center',
      });
    }
  }, [isPending]);
  return (
    <div className="pt-6 create-contact-header-padding-for-large-screen px-2">
      <div className="flex justify-between items-center w-full">
        <div
          onClick={handleBack}
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
            onClick={handleSave}
            disabled={disabled}
            className={`h-10 px-6 cursor-pointer rounded-[24px] ${disabled ? 'bg-[#e4e4e4] text-[#9f9f9f]' : 'text-white bg-[#0b57d0]'}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContactHeader;
