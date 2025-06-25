import { UserRound } from 'lucide-react';
import { FC, useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import {
  MdCameraAlt,
  MdEdit,
  MdLocationOn,
  MdOutlineCake,
  MdOutlineMail,
  MdPersonOutline,
  MdPhone,
} from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { TCreateContact } from '../interfaces/contacts.interface';
import ImageServices from '../services/image.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const { processImageUpload, processImageDelete } = ImageServices;

const CreateContact: FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const handleReturn = () => {
    const returnPath = location?.state?.from || '/';
    navigate(returnPath);
  };
  const [payload, setPayload] = useState<TCreateContact>({
    avatar: null,
    birthday: null,
    email: null,
    firstName: null,
    lastName: null,
    location: null,
    phone: null,
    worksAt: null,
  });
  const { mutate: uploadImage, isPending: isUploading } = useMutation({
    mutationFn: async (payload: FormData) => await processImageUpload(payload),
    onSuccess: (data) => {
      setPayload((prev) => ({
        ...prev,
        avatar: {
          publicId: data?.data?.image?.publicId,
          url: data?.data?.image?.url,
        },
      }));
      toast.success('Image uploaded successfully!');
    },
    onError: (error: any) => {
      console.error('Image upload failed:', error);
      toast.error(
        error?.response?.data?.message ||
          'Failed to upload image. Please try again.'
      );
    },
  });
  const { mutate: deleteImage, isPending: isDeleteing } = useMutation({
    mutationFn: async (payload: string) => await processImageDelete(payload),
    onSuccess: () => {
      setPayload((prev) => ({
        ...prev,
        avatar: null,
      }));
      toast.success('Image delete successfully!');
    },
    onError: (error: any) => {
      console.error('Image delete failed:', error);
      toast.error(
        error?.response?.data?.message ||
          'Failed to delete image. Please try again.'
      );
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB.');
      return;
    }

    const payload = new FormData();
    payload.append('image', file);
    uploadImage(payload);
  };

  const handleImageClick = () => {
    if (isUploading || isDeleteing) return; // Prevent clicking during upload
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    if (isUploading || isDeleteing) return; // Prevent removal during upload
    deleteImage(payload.avatar?.publicId as string);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <section className="lg:h-full lg:overflow-y-scroll">
      <ToastContainer position="top-center" />
      <div className="w-full lg:w-ful  xl:w-[950px] xl:p-4 ">
        <div className="flex justify-between items-center">
          <div onClick={handleReturn} className="p-2 cursor-pointer">
            <FaArrowLeft size={20} className=" text-[#444746] " />
          </div>
          <div className="flex items-center justify-end space-x-1">
            <button className="px-5 cursor-pointer py-2 bg-blue-700 rounded-[40px] text-white">
              Save
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-start items-center mt-12 space-y-6 ">
          <div className="relative w-[100px] bg-blue-200 rounded-full h-[100px] lg:w-[162px] lg:h-[162px]">
            {payload.avatar ? (
              <div className="relative group w-full h-full">
                <img
                  src={payload.avatar.url}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
                {/* Overlay with edit/remove options */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={handleImageClick}
                      disabled={isUploading || isDeleteing}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Change photo"
                    >
                      <MdEdit size={16} className="text-gray-700" />
                    </button>
                    <button
                      onClick={removeImage}
                      disabled={isUploading || isDeleteing}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove photo"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-red-600"
                      >
                        <path
                          d="M6 6l12 12M6 18L18 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Loading overlay */}
                {(isUploading || isDeleteing) && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <ClipLoader color="#ffffff" size={30} />
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={handleImageClick}
                className={`flex justify-center items-center h-full cursor-pointer hover:bg-blue-300 transition-colors rounded-full relative group ${
                  isUploading || isDeleteing
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                <div className="relative">
                  {isUploading || isDeleteing ? (
                    <div className="flex items-center justify-center">
                      <ClipLoader color="#2563eb" size={40} />
                    </div>
                  ) : (
                    <>
                      <UserRound size={90} className="text-blue-600" />
                      {/* Camera overlay icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-blue-600 rounded-full p-2">
                          <MdCameraAlt size={20} className="text-white" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              name="contactImage"
              id="contactImage"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUploading || isDeleteing}
            />
          </div>
        </div>
        <div className="mt-12 w-full pb-10 pr-5 md:px-14 lg:px-0  ">
          <form className="flex flex-col space-y-4 outline-none ">
            <div className="flex items-baseline w-full space-x-4">
              <div className="text-[#747775]">
                <MdPersonOutline size={25} />
              </div>
              <div className="flex w-full flex-col space-y-2">
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="First Name"
                    type="text"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="firstName"
                    id="firstName"
                  />
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="Last Name"
                    type="text"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="lastName"
                    id="lastName"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-baseline w-full space-x-4">
              <div className="text-[#747775]">
                <HiOutlineBuildingOffice2 size={25} />
              </div>
              <div className="flex w-full flex-col space-y-2">
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="Company"
                    type="text"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="companyName"
                    id="companyName"
                  />
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="Job Title"
                    type="text"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="jobTitle"
                    id="jobTitle"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center w-full space-x-4">
              <div className="text-[#747775]">
                <MdOutlineMail size={25} />
              </div>
              <div className="flex w-full flex-col space-y-2">
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="Email"
                    type="email"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="email"
                    id="email"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center w-full space-x-4">
              <div className="text-[#747775]">
                <MdPhone size={25} />
              </div>
              <div className="flex w-full flex-col space-y-2">
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="Phone"
                    type="text"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="phone"
                    id="phone"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-baseline w-full space-x-4">
              <div className="text-[#747775]">
                <MdLocationOn size={25} />
              </div>
              <div className="flex w-full flex-col space-y-2">
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="Country"
                    type="text"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="country"
                    id="country"
                  />
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="City"
                    type="text"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="city"
                    id="city"
                  />
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="Post Code"
                    type="text"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="postCode"
                    id="postCode"
                  />
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="Street Address"
                    type="text"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="streetAddress"
                    id="streetAddress"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-baseline w-full space-x-4">
              <div className="text-[#747775]">
                <MdOutlineCake size={25} />
              </div>
              <div className="flex w-full flex-col space-y-2">
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="Date"
                    type="text"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="date"
                    id="date"
                  />
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="Month"
                    type="text"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="month"
                    id="month"
                  />
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    placeholder="Year"
                    type="text"
                    className="px-3 w-full py-2 border border-gray-500 rounded-lg"
                    name="year"
                    id="year"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateContact;
