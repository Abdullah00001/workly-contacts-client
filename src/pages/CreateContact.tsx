import { Camera, Edit, Trash2, UserRound, X } from 'lucide-react';
import { FC, useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import {
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
import { AxiosError } from 'axios';

const { processImageUpload, processImageDelete } = ImageServices;
const { processCreateContact } = ContactServices;

const CreateContact: FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
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
    onError: (error: AxiosError) => {
      console.error('Image upload failed:', error);
      toast.error(
        (error?.response?.data as { message?: string })?.message ||
          'Failed to upload image. Please try again.'
      );
    },
  });
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
      onError: (error: AxiosError) => {
        console.error('Contact Creation failed:', error);
        toast.dismiss();
        toast.error(
          (error?.response?.data as { message?: string })?.message ||
            'Failed to create contact. Please try again.'
        );
      },
    });
  const { mutate: deleteImage, isPending: isDeleting } = useMutation({
    mutationFn: async (payload: string) => await processImageDelete(payload),
    onSuccess: () => {
      setPayload((prev) => ({
        ...prev,
        avatar: { ...prev.avatar, publicId: null, url: null },
      }));
      setShowModal(false);
      toast.success('Image delete successfully!');
    },
    onError: (error: AxiosError) => {
      console.error('Image delete failed:', error);
      toast.error(
        (error?.response?.data as { message?: string })?.message ||
          'Failed to delete image. Please try again.'
      );
    },
  });
  const handleResetState = () => {
    if (payload.avatar?.publicId) deleteImage(payload.avatar?.publicId);
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleEdit = () => {
    fileInputRef.current?.click();
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
    const imagePayload = new FormData();
    imagePayload.append('image', file);
    if (payload.avatar?.publicId)
      imagePayload.append('publicId', payload.avatar?.publicId);
    uploadImage(imagePayload);
  };

  const handleImageClick = () => {
    if (isUploading || isDeleting) return;
    if (payload.avatar.url) {
      setShowModal(true);
      return;
    }
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    if (isUploading || isDeleting) return;
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
                  onClick={handleImageClick}
                  disabled={isUploading || isDeleting}
                  className="absolute left-[113px] top-[90px] lg:left-[130px] lg:top-[110px] w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Edit photo"
                >
                  <Edit size={16} />
                </button>

                {/* Loading overlay */}
                {(isUploading || isDeleting) && (
                  <div className="absolute inset-0 bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={handleImageClick}
                className={`flex justify-center items-center h-full cursor-pointer hover:bg-blue-300 transition-colors rounded-full relative ${
                  isUploading || isDeleting
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                <div className="relative">
                  {isUploading || isDeleting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <>
                      <UserRound size={90} className="text-blue-600" />

                      {/* Camera overlay icon - Always visible on all devices */}
                      <div className="absolute left-[90px] top-[60px] lg:left-[95px] lg:top-[70px] w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Camera size={16} className="text-white" />
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
              disabled={isUploading || isDeleting}
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
                {(isUploading || isDeleting) && (
                  <div className="absolute inset-0 bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleEdit}
                  disabled={isUploading || isDeleting}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>

                <button
                  onClick={removeImage}
                  disabled={isUploading || isDeleting}
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isDeleting ? (
                    <ClipLoader />
                  ) : (
                    <>
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateContact;
