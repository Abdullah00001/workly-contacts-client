import { UserRound } from 'lucide-react';
import { FC, useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
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
import {
  ICreateContactPayload,
  Month,
  TCreateContact,
} from '../interfaces/contacts.interface';
import ImageServices from '../services/image.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { contactSchema } from '../schemas/contacts.schemas';
import ContactServices from '../services/contacts.services';
import DiscardModal from '../components/ui/modal/DiscardModal';

const { processImageUpload, processImageDelete } = ImageServices;
const { processCreateContact } = ContactServices;

const CreateContact: FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState<Boolean>(false);
  const [payload, setPayload] = useState<TCreateContact>({
    avatar: {
      publicId: null,
      url: null,
    },
    birthday: {
      day: null,
      month: null,
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
    phone: '',
    worksAt: {
      companyName: null,
      jobTitle: null,
    },
  });
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
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
  const handleResetState = () => {
    setPayload((prev) => ({
      ...prev,
      avatar: {
        publicId: null,
        url: null,
      },
      birthday: {
        day: null,
        month: null,
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
      phone: '',
      worksAt: {
        companyName: null,
        jobTitle: null,
      },
    }));
    const returnPath = location?.state?.from || '/';
    navigate(returnPath);
  };
  const hasPayloadValues = () => {
    return (
      payload.firstName.trim() !== '' ||
      payload.lastName.trim() !== '' ||
      payload.email.trim() !== '' ||
      payload.phone.trim() !== '' ||
      payload.avatar.url !== null ||
      payload.worksAt.companyName !== null ||
      payload.worksAt.jobTitle !== null ||
      payload.location.country !== null ||
      payload.location.city !== null ||
      payload.location.postCode !== null ||
      payload.location.streetAddress !== null ||
      payload.birthday.day !== null ||
      payload.birthday.month !== null ||
      payload.birthday.year !== null
    );
  };

  // Modify the back button click handler
  const handleBackClick = () => {
    if (hasPayloadValues()) {
      setIsDiscardModalOpen(true);
    } else {
      const returnPath = location?.state?.from || '/';
      navigate(returnPath);
    }
  };
  const { mutate: createContact, isPending: isCreateContactPending } =
    useMutation({
      mutationFn: async (payload: ICreateContactPayload) =>
        await processCreateContact(payload),
      onSuccess: (data) => {
        toast.dismiss();
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
        toast.success('Contact Created');
        setTimeout(() => {
          navigate(`/person/${data.data._id}`);
        }, 2000);
      },
      onError: (error: any) => {
        console.error('Contact Creation failed:', error);
        toast.dismiss();
        toast.error(
          error?.response?.data?.message ||
            'Failed to create contact. Please try again.'
        );
      },
    });
  const { mutate: deleteImage, isPending: isDeleteing } = useMutation({
    mutationFn: async (payload: string) => await processImageDelete(payload),
    onSuccess: () => {
      setPayload((prev) => ({
        ...prev,
        avatar: { ...prev.avatar, publicId: null, url: null },
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
  const handleChangeBasicField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeWorksAt = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      worksAt: { ...prev.worksAt, [name]: value },
    }));
  };
  const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedValue =
      name === 'postCode'
        ? value === ''
          ? null
          : Number(value)
        : value === ''
          ? null
          : value;

    setPayload((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: updatedValue,
      },
    }));
  };

  const handleChangeBirthday = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    const updatedValue =
      name === 'day' || name === 'year'
        ? value === ''
          ? null
          : Number(value)
        : value === ''
          ? null
          : value;
    setPayload((prev) => ({
      ...prev,
      birthday: { ...prev.birthday, [name]: updatedValue },
    }));
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB.');
      return;
    }

    const payload = new FormData();
    payload.append('image', file);
    uploadImage(payload);
  };

  const handleImageClick = () => {
    if (isUploading || isDeleteing) return;
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    if (isUploading || isDeleteing) return;
    deleteImage(payload.avatar?.publicId as string);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    const result = contactSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          const fieldName = err.path.join('.');
          fieldErrors[fieldName] = err.message;
        }
      });
      setFieldErrors(fieldErrors);
      return;
    }
    createContact(payload as ICreateContactPayload);
  };
  useEffect(() => {
    if (!isCreateContactPending) return;
    toast.success('Contact Is Creating...');
  }, [isCreateContactPending]);
  return (
    <section className="lg:h-full lg:overflow-y-scroll">
      <ToastContainer position="top-center" />
      <div className="w-full lg:w-ful  xl:w-[950px] xl:p-4 ">
        <div className="flex justify-between items-center">
          <div onClick={handleBackClick} className="p-2 cursor-pointer">
            <FaArrowLeft size={20} className=" text-[#444746] " />
          </div>
          <div className="flex items-center justify-end space-x-1">
            <button
              onClick={handleSave}
              className="px-5 cursor-pointer py-2 bg-blue-700 rounded-[40px] text-white"
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-start items-center mt-12 space-y-6 ">
          <div className="relative w-[100px] bg-blue-200 rounded-full h-[100px] lg:w-[162px] lg:h-[162px]">
            {payload.avatar.url ? (
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
                    onChange={handleChangeBasicField}
                    placeholder="First Name"
                    type="text"
                    className={`${
                      fieldErrors.email && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="firstName"
                    id="firstName"
                  />
                  {fieldErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    onChange={handleChangeBasicField}
                    placeholder="Last Name"
                    type="text"
                    className={`${
                      fieldErrors.email && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="lastName"
                    id="lastName"
                  />
                  {fieldErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.lastName}
                    </p>
                  )}
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
                    onChange={handleChangeWorksAt}
                    placeholder="Company"
                    type="text"
                    className={`${
                      fieldErrors['worksAt'] && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="companyName"
                    id="companyName"
                  />
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    onChange={handleChangeWorksAt}
                    placeholder="Job Title"
                    type="text"
                    className={`${
                      fieldErrors['worksAt'] && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="jobTitle"
                    id="jobTitle"
                  />
                </div>
                {fieldErrors['worksAt'] && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors['worksAt']}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center w-full space-x-4">
              <div className="text-[#747775]">
                <MdOutlineMail size={25} />
              </div>
              <div className="flex w-full flex-col space-y-2">
                <div className="w-full lg:w-[520px]">
                  <input
                    onChange={handleChangeBasicField}
                    placeholder="Email"
                    type="email"
                    className={`${
                      fieldErrors.email && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="email"
                    id="email"
                  />
                  {fieldErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
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
                    onChange={handleChangeBasicField}
                    placeholder="Phone"
                    type="text"
                    className={`${
                      fieldErrors.email && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="phone"
                    id="phone"
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.phone}
                    </p>
                  )}
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
                    onChange={handleChangeLocation}
                    placeholder="Country"
                    type="text"
                    className={`${
                      fieldErrors['location'] && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="country"
                    id="country"
                  />
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    onChange={handleChangeLocation}
                    placeholder="City"
                    type="text"
                    className={`${
                      fieldErrors['location'] && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="city"
                    id="city"
                  />
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    onChange={handleChangeLocation}
                    placeholder="Post Code"
                    type="number"
                    className={`${
                      fieldErrors['location'] && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="postCode"
                    id="postCode"
                  />
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    onChange={handleChangeLocation}
                    placeholder="Street Address"
                    type="text"
                    className={`${
                      fieldErrors['location'] && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="streetAddress"
                    id="streetAddress"
                  />
                </div>
                {fieldErrors['location'] && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors['location']}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-baseline w-full space-x-4">
              <div className="text-[#747775]">
                <MdOutlineCake size={25} />
              </div>
              <div className="flex w-full flex-col space-y-2">
                <div className="w-full lg:w-[520px]">
                  <input
                    onChange={handleChangeBirthday}
                    placeholder="Date"
                    type="number"
                    className={`${
                      fieldErrors['birthday'] && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="day"
                    id="day"
                  />
                </div>
                <div className="w-full lg:w-[520px]">
                  {/* <input
                    onChange={handleChangeBirthday}
                    placeholder="Month"
                    type="text"
                    className={`${
                      fieldErrors['birthday'] && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="month"
                    id="month"
                  /> */}
                  <select
                    onChange={handleChangeBirthday}
                    name="month"
                    id="month"
                    className={`${
                      fieldErrors['birthday'] && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Month
                    </option>
                    {Object.values(Month).map((month) => (
                      <option key={month} value={month}>
                        {month.charAt(0).toUpperCase() + month.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full lg:w-[520px]">
                  <input
                    onChange={handleChangeBirthday}
                    placeholder="Year"
                    type="number"
                    className={`${
                      fieldErrors['birthday'] && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="year"
                    id="year"
                  />
                </div>
                {fieldErrors['birthday'] && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors['birthday']}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {isDiscardModalOpen && (
        <DiscardModal
          handleResetState={handleResetState}
          setIsDiscardModalOpen={setIsDiscardModalOpen}
        />
      )}
    </section>
  );
};

export default CreateContact;
