import { FC, useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ContactServices from '../services/contacts.services';
import { ClipLoader } from 'react-spinners';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import {
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
import { Camera, Edit, Trash2, UserRound, X } from 'lucide-react';
import DiscardModal from '../components/ui/modal/DiscardModal';
import { AxiosError } from 'axios';

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
  const [showModal, setShowModal] = useState(false);
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
  const handleEdit = () => {
    fileInputRef.current?.click();
  };
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
  const { mutate: putEditContact } = useMutation({
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
    onError: (error: AxiosError) => {
      console.error('Contact update failed:', error);
      toast.dismiss();
      toast.error(
        (error?.response?.data as { message?: string })?.message ||
          'Failed to update contact. Please try again.'
      );
    },
  });
  const { mutate: patchEditContact } = useMutation({
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
    onError: (error: AxiosError) => {
      console.error('Contact update failed:', error);
      toast.dismiss();
      toast.error(
        (error?.response?.data as { message?: string })?.message ||
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
      setShowModal(false);
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
  const handleEditImage = () => {
    setShowModal(true);
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
  }, [data?.data, isPending]);
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
        <div className="flex justify-center lg:justify-start items-center mt-12 space-y-6">
          <div className="relative w-[142px] bg-blue-200 rounded-full h-[142px] lg:w-[162px] lg:h-[162px]">
            {payload.avatar.url ? (
              <div className="relative w-full h-full">
                <img
                  src={payload.avatar.url}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />

                {/* Edit Icon - Always visible on all devices */}
                <button
                  onClick={handleEditImage}
                  className="absolute left-[113px] top-[90px] lg:left-[130px] lg:top-[110px] w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Edit photo"
                >
                  <Edit size={16} />
                </button>
              </div>
            ) : (
              <div
                onClick={handleImageClick}
                className={`flex justify-center items-center h-full cursor-pointer hover:bg-blue-300 transition-colors rounded-full relative`}
              >
                <div className="relative">
                  <>
                    <UserRound size={90} className="text-blue-600" />

                    {/* Camera overlay icon - Always visible on all devices */}
                    <div className="absolute left-[90px] top-[60px] lg:left-[95px] lg:top-[70px] w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Camera size={16} className="text-white" />
                    </div>
                  </>
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
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gray-200 rounded-lg max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Edit</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Image Preview */}
              <div className="flex justify-center mb-6">
                <img
                  src={payload.avatar.url as string}
                  alt="Avatar Preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleEdit}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>

                <button
                  onClick={removeImage}
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <>
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PersonEdit;
