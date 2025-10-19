'use client';
import Icon from '@/components/common/Icon';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FC, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { TUpdateContactDetails, TUpdateContactHeader } from '../types/type';
import { navigationGuardStore } from '@/stores/navigation-guard-store';
import { TContact } from '@/features/create-contact/types/type';
import {
  UpdateContactInfoForm,
  UpdateContactInfoText,
} from '../services/update-contact-service';

const UpdateContactHeader: FC<TUpdateContactHeader> = ({
  details,
  payload,
  newImage,
  setPayload,
  setNewImage,
}) => {
  const queryClient = useQueryClient();
  const { hasUnsavedChanges, setUnsavedChanges, setNextRoute, setModalOpen } =
    navigationGuardStore();
  const fetchedData: TUpdateContactDetails = {
    avatar: details?.avatar,
    birthday: details?.birthday,
    email: details?.email,
    firstName: details?.firstName,
    lastName: details?.lastName,
    location: details?.location,
    phone: details?.phone,
    worksAt: details?.worksAt,
  };
  const router = useRouter();
  const handleBack = () => {
    if (hasUnsavedChanges) {
      // show discard modal globally
      setNextRoute('back'); // special flag for back navigation
      setModalOpen(true);
    } else {
      router.back();
    }
  };
  const { mutate: putEditContact, isPending: isPutEditContactPending } =
    useMutation({
      mutationFn: async (payload: { id: string; payload: FormData }) =>
        await UpdateContactInfoForm(payload),
      onSuccess: (data) => {
        queryClient.setQueryData(['contacts', data?._id], data);
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
        setNewImage(null);
        toast('Contact details updated', {
          closeButton: false,
          position: 'bottom-center',
        });
        router.push(`/person/${details?._id}`);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message, {
            closeButton: false,
            position: 'bottom-center',
          });
        }
        toast.error('Contact details update failed,Try Again!', {
          closeButton: false,
          position: 'bottom-center',
        });
      },
    });
  const { mutate: patchEditContact, isPending: isPatchEditContactPending } =
    useMutation({
      mutationFn: async (payload: {
        id: string;
        payload: TUpdateContactDetails;
      }) => await UpdateContactInfoText(payload),
      onSuccess: (data) => {
        queryClient.setQueryData(['contacts', data?._id], data);
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
        setNewImage(null);
        toast('Contact details updated', {
          closeButton: false,
          position: 'bottom-center',
        });
        router.push(`/person/${details?._id}`);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message, {
            closeButton: false,
            position: 'bottom-center',
          });
        }
        toast.error('Contact details update failed,Try Again!', {
          closeButton: false,
          position: 'bottom-center',
        });
      },
    });
  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (newImage) {
      const {
        avatar,
        birthday,
        email,
        firstName,
        lastName,
        location,
        phone,
        worksAt,
      } = payload;
      const updatedPayload = new FormData();
      if (avatar) updatedPayload.append('avatar', JSON.stringify(avatar));
      if (birthday) updatedPayload.append('birthday', JSON.stringify(birthday));
      if (email) updatedPayload.append('email', email);
      if (firstName) updatedPayload.append('firstName', firstName);
      if (lastName) updatedPayload.append('lastName', lastName);
      if (location) updatedPayload.append('location', JSON.stringify(location));
      if (phone) updatedPayload.append('phone', JSON.stringify(phone));
      if (worksAt) updatedPayload.append('worksAt', JSON.stringify(worksAt));
      updatedPayload.append('avatarImage', newImage);
      putEditContact({ id: details._id as string, payload: updatedPayload });
      return;
    }
    patchEditContact({ id: details._id as string, payload });
  };
  const isPending = isPutEditContactPending || isPatchEditContactPending;
  useEffect(() => {
    if (isPending) {
      toast('Working...', {
        closeButton: false,
        position: 'bottom-center',
      });
    }
  }, [isPending]);
  useEffect(() => {
    const changed = JSON.stringify(fetchedData) !== JSON.stringify(payload);
    setUnsavedChanges(changed);
  }, [payload, details]);
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
            disabled={!hasUnsavedChanges || isPending}
            onClick={handleSave}
            className={`h-10 px-6 rounded-[24px] ${!hasUnsavedChanges || isPending ? 'bg-[#e4e4e4] text-[#9f9f9f] cursor-not-allowed' : 'text-white bg-[#0b57d0] cursor-pointer'}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateContactHeader;
