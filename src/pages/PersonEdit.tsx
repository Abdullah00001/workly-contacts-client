import { FC, useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ContactServices from '../services/contacts.services';
import { ClipLoader } from 'react-spinners';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  IBirthDate,
  IEditContact,
  ILocation,
  IUpdateOneContactPayload,
  IWorksAt,
  Month,
  TContacts,
} from '../interfaces/contacts.interface';
import { contactSchema } from '../schemas/contacts.schemas';
import { UserRound } from 'lucide-react';
import DiscardModal from '../components/ui/modal/DiscardModal';

const {
  processPatchEditContact,
  processPutEditContact,
  processGetSingleContact,
} = ContactServices;

const PersonEdit: FC = () => {
  const { id } = useParams();
  const [newImage, setNewImage] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<TContacts | null>(null);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [payload, setPayload] = useState<TContacts>({
    name: '',
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
    isFavorite: false,
    isTrashed: false,
    trashedAt: '',
    userId: '',
    _id: '',
    createdAt: '',
    updatedAt: '',
  });
  const checkForChanges = (currentPayload: TContacts, original: TContacts) => {
    if (!original) return false;

    // Check basic fields
    if (
      currentPayload.name !== original.name ||
      currentPayload.email !== original.email ||
      currentPayload.phone !== original.phone
    ) {
      return true;
    }

    // Check worksAt fields
    if (
      currentPayload.worksAt?.companyName !== original.worksAt?.companyName ||
      currentPayload.worksAt?.jobTitle !== original.worksAt?.jobTitle
    ) {
      return true;
    }

    // Check location fields
    if (
      currentPayload.location?.country !== original.location?.country ||
      currentPayload.location?.city !== original.location?.city ||
      currentPayload.location?.postCode !== original.location?.postCode ||
      currentPayload.location?.streetAddress !==
        original.location?.streetAddress
    ) {
      return true;
    }

    // Check birthday fields
    if (
      currentPayload.birthday?.day !== original.birthday?.day ||
      currentPayload.birthday?.month !== original.birthday?.month ||
      currentPayload.birthday?.year !== original.birthday?.year
    ) {
      return true;
    }

    // Check if new image is uploaded
    if (newImage) {
      return true;
    }

    // Check if avatar URL was removed
    if (currentPayload.avatar?.url !== original.avatar?.url) {
      return true;
    }

    return false;
  };
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['contact', id],
    queryFn: async () => {
      return await processGetSingleContact(id as string);
    },
    enabled: !!id,
  });
  const { mutate: putEditContact, isPending: isPutEditContactPending } =
    useMutation({
      mutationFn: async ({ id, payload }: IEditContact) =>
        await processPutEditContact({ id, payload }),
      onSuccess: (data) => {
        toast.dismiss();
        const response = data?.data;
        setPayload((prev) => ({ ...prev, response }));
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
        queryClient.invalidateQueries({
          queryKey: ['contacts', response?._id],
        });
        toast.success('Contact Updated');
        setTimeout(() => {
          navigate(`/person/${response?._id}`);
        }, 2000);
      },
      onError: (error: any) => {
        console.error('Contact update failed:', error);
        toast.dismiss();
        toast.error(
          error?.response?.data?.message ||
            'Failed to update contact. Please try again.'
        );
      },
    });
  const { mutate: patchEditContact, isPending: isPatchEditContactPending } =
    useMutation({
      mutationFn: async ({ id, payload }: IEditContact) =>
        await processPatchEditContact({ id, payload }),
      onSuccess: (data) => {
        toast.dismiss();
        const response = data?.data;
        setPayload((prev) => ({ ...prev, response }));
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
        queryClient.invalidateQueries({
          queryKey: ['contacts', response?._id],
        });
        toast.success('Contact Updated');
        setTimeout(() => {
          navigate(`/person/${response?._id}`);
        }, 2000);
      },
      onError: (error: any) => {
        console.error('Contact update failed:', error);
        toast.dismiss();
        toast.error(
          error?.response?.data?.message ||
            'Failed to update contact. Please try again.'
        );
      },
    });
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
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
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    if (payload.avatar?.url) {
      setPayload((prev) => ({
        ...prev,
        avatar: { ...prev.avatar, url: null },
      }));
    } else {
      setNewImage(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
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
    if (payload.avatar?.url) {
      setPayload((prev) => ({
        ...prev,
        avatar: { ...prev.avatar, url: null },
      }));
    }
    setNewImage(file);
    const previewUrl = URL.createObjectURL(file);
    setPayload((prev) => ({
      ...prev,
      avatar: {
        ...prev.avatar,
        url: previewUrl,
      },
    }));
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
    if (newImage) {
      const { avatar, birthday, email, name, location, phone, worksAt, _id } =
        payload;
      const updatedPayload = new FormData();
      if (avatar) updatedPayload.append('avatar', JSON.stringify(avatar));
      if (birthday) updatedPayload.append('birthday', JSON.stringify(birthday));
      if (email) updatedPayload.append('email', email);
      if (name) updatedPayload.append('name', name);
      if (location) updatedPayload.append('location', JSON.stringify(location));
      if (phone) updatedPayload.append('phone', phone);
      if (worksAt) updatedPayload.append('worksAt', JSON.stringify(worksAt));
      updatedPayload.append('avatarImage', newImage);
      putEditContact({ id: _id as string, payload: updatedPayload });
      return;
    }
    const { avatar, birthday, email, name, location, phone, worksAt, _id } =
      payload;
    const updatedPayload: IUpdateOneContactPayload = {
      avatar,
      birthday: birthday as IBirthDate,
      email,
      name,
      location: location as ILocation,
      phone,
      worksAt: worksAt as IWorksAt,
    };
    patchEditContact({ id: _id as string, payload: updatedPayload });
    return;
  };
  const handleResetState = () => {
    removeImage();
    const returnPath = location?.state?.from || '/';
    navigate(returnPath);
  };
  const handleBackClick = () => {
    if (hasChanges) {
      setIsDiscardModalOpen(true);
    } else {
      handleResetState();
    }
  };
  useEffect(() => {
    if (isPending && !data) return;
    setPayload(data?.data);
    setOriginalData(data?.data);
  }, [data?.data]);
  useEffect(() => {
    if (originalData && payload) {
      const changes = checkForChanges(payload, originalData);
      setHasChanges(changes);
    }
  }, [payload, originalData, newImage]);
  if (isPending) {
    return (
      <div className="flex justify-center  items-center min-h-screen">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen  text-red-600 px-4">
        <FaExclamationTriangle size={50} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
        <p className="text-lg text-center max-w-md">
          {error.message ||
            'An unexpected error occurred. Please try again later.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white font-medium"
        >
          Refresh Page
        </button>
      </div>
    );
  }
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
                      disabled={
                        isPutEditContactPending || isPatchEditContactPending
                      }
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Change photo"
                    >
                      <MdEdit size={16} className="text-gray-700" />
                    </button>
                    <button
                      onClick={removeImage}
                      disabled={
                        isPutEditContactPending || isPatchEditContactPending
                      }
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
                {(isPutEditContactPending || isPatchEditContactPending) && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <ClipLoader color="#ffffff" size={30} />
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={handleImageClick}
                className={`flex justify-center items-center h-full cursor-pointer hover:bg-blue-300 transition-colors rounded-full relative group ${
                  isPutEditContactPending || isPatchEditContactPending
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                <div className="relative">
                  {isPutEditContactPending || isPatchEditContactPending ? (
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
              disabled={isPutEditContactPending || isPatchEditContactPending}
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
                    value={payload?.name}
                    placeholder="Name"
                    type="text"
                    className={`${
                      fieldErrors.name && 'border-red-500'
                    } px-3 w-full py-2 border border-gray-500 rounded-lg`}
                    name="name"
                    id="name"
                  />
                  {fieldErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.name}
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
                    value={payload?.worksAt?.companyName as string}
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
                    value={payload?.worksAt?.jobTitle as string}
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
                    value={payload?.email}
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
                    value={payload?.phone}
                    placeholder="Phone"
                    type="text"
                    className={`${
                      fieldErrors.phone && 'border-red-500'
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
                    value={payload?.location?.country as string}
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
                    value={payload?.location?.city as string}
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
                    value={payload?.location?.postCode as number}
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
                    value={payload?.location?.streetAddress as string}
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
                    value={payload?.birthday?.day as number}
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
                  <select
                    onChange={handleChangeBirthday}
                    value={payload?.birthday?.month as Month}
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
                    value={payload?.birthday?.year as number}
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

export default PersonEdit;
