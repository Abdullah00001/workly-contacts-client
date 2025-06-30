import { FC, useState } from 'react';
import {
  FaArrowLeft,
  FaEdit,
  FaExclamationTriangle,
  FaRegStar,
  FaStar,
  FaTrash,
} from 'react-icons/fa';
import {
  MdOutlineCake,
  MdOutlineEmail,
  MdOutlineLocalPhone,
  MdOutlineLocationOn,
} from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EditContact from './EditContact';
import SingleDeleteModal from '../components/ui/SingleDeleteModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ContactServices from '../services/contacts.services';
import DateUtils from '../utils/date.utils';
import { ClipLoader } from 'react-spinners';
import { IFavoritePayload } from '../interfaces/contacts.interface';
import { toast, ToastContainer } from 'react-toastify';

const { processGetSingleContact, processChangeFavoriteStatus } =
  ContactServices;
const { formatDate } = DateUtils;

const ContactDetails: FC = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['contact', id],
    queryFn: async () => {
      return await processGetSingleContact(id as string);
    },
    enabled: !!id,
  });
  const { mutate: changeFavoriteStatus } = useMutation({
    mutationFn: async ({ id, payload }: IFavoritePayload) =>
      await processChangeFavoriteStatus({ id, payload }),
    onSuccess: (data) => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact', id] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      if (data.data.isFavorite === false)
        toast.success(
          `Removed ${data?.data?.firstName} ${data?.data?.lastName} to favorites`
        );
      if (data.data.isFavorite === true)
        toast.success(
          `Added ${data?.data?.firstName} ${data?.data?.lastName} to favorites`
        );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleReturn = () => {
    const returnPath = location?.state?.from || '/';
    navigate(returnPath);
  };
  const [isDelete, setIsDelete] = useState(false);
  const handleFavorite = () => {
    toast.info('Working...');
    const currentFavorite = data.data.isFavorite;
    const newFavoriteStatus = !currentFavorite;
    changeFavoriteStatus({
      id: id as string,
      payload: { isFavorite: newFavoriteStatus },
    });
  };
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleIsDelete = () => {
    setIsDelete(!isDelete);
  };
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
    <>
      {!isEdit ? (
        <section className="lg:h-full relative lg:overflow-y-scroll">
          <ToastContainer position="top-center" />
          <div className="w-full lg:w-full xl:w-[950px] xl:p-8">
            <>
              <div className="flex justify-between items-center">
                {/* Left Arrow Icon */}
                <div onClick={handleReturn} className="p-2 cursor-pointer">
                  <FaArrowLeft size={20} className=" text-[#444746] " />
                </div>

                {/* Right side icons (Favorite, Edit, Delete) */}
                <div className="flex items-center justify-end space-x-1">
                  <div className="p-2 cursor-pointer">
                    {data?.data?.isFavorite ? (
                      <span
                        className=" text-blue-600 "
                        onClick={handleFavorite}
                      >
                        <FaStar size={20} />
                      </span>
                    ) : (
                      <span
                        onClick={handleFavorite}
                        className=" text-[#444746] "
                      >
                        <FaRegStar size={20} />
                      </span>
                    )}
                  </div>
                  <div onClick={handleEdit} className="p-2 cursor-pointer">
                    <FaEdit size={20} className=" text-[#444746] " />
                  </div>
                  <div onClick={handleIsDelete} className="p-2 cursor-pointer">
                    <FaTrash size={20} className=" text-[#444746] " />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-center lg:space-x-10 mt-[50px] space-y-7">
                <div className="w-[112px] h-[112px] md:w-[268px] md:h-[268px] lg:w-[162px] lg:h-[162px] cursor-pointer">
                  {data?.data?.avatar?.url ? (
                    <img
                      src={data?.data?.avatar?.url}
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${data.data?.firstName}`}
                      alt="Avatar"
                      className="w-full rounded-full"
                    />
                  )}
                </div>
                <div>
                  <h1 className="text-center font-normal text-wrap text-2xl lg:text-[28px]">
                    {data?.data?.firstName} {data?.data?.lastName}
                  </h1>
                  <h4 className="text-[16px] text-gray-800">
                    {data?.data?.worksAt?.jobTitle &&
                      data?.data?.worksAt?.companyName &&
                      `${data?.data?.worksAt?.jobTitle}•
                    ${data?.data?.worksAt?.companyName}`}
                  </h4>
                </div>
              </div>
              <div className="flex flex-col justify-start lg:justify-start lg:flex-row lg:space-x-4 lg:items-start">
                <div className="flex flex-col justify-center mt-5">
                  <div className="flex flex-col justify-start space-y-4  p-4 bg-[#f0f4f9] rounded-[12px] text-[#1f1f1f]">
                    <div>
                      <h1 className="text-[16px]  font-medium">
                        Contact Details
                      </h1>
                    </div>
                    <div className="flex items-start justify-start space-x-3">
                      <div>
                        <MdOutlineEmail size={20} />
                      </div>
                      <div className="">
                        <p className="break-all text-[14px]">
                          {data?.data?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-start space-x-3">
                      <div>
                        <MdOutlineLocalPhone size={20} />
                      </div>
                      <div className="">
                        <p className="break-all text-[14px]">
                          {data?.data?.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-start space-x-3">
                      <div>
                        <MdOutlineLocationOn size={20} />
                      </div>
                      <div className="">
                        {data.data?.location?.streetAddress &&
                        data?.data?.location?.city &&
                        data?.data?.location?.postCode &&
                        data?.data?.location?.country ? (
                          <p className="wrap-break-word text-[14px]">
                            {`${data.data?.location?.streetAddress}
                          ${data?.data?.location?.city}
                          ${data?.data?.location?.postCode}
                          ${data?.data?.location?.country}`}
                          </p>
                        ) : (
                          <p
                            className="text-[14px] font-medium text-blue-500 cursor-pointer"
                            onClick={handleEdit}
                          >
                            Add Location
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start justify-start space-x-3">
                      <div>
                        <MdOutlineCake size={20} />
                      </div>
                      <div className="">
                        {data.data?.birthday?.day &&
                        data?.data?.birthday?.month &&
                        data?.data?.birthday?.year ? (
                          <p className="break-all text-[14px]">
                            {`${data.data?.birthday?.day}
                            ${data?.data?.birthday?.month}
                            ${data?.data?.birthday?.year}`}
                          </p>
                        ) : (
                          <p
                            className="text-[14px] font-medium text-blue-500 cursor-pointer"
                            onClick={handleEdit}
                          >
                            Add Birthday
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-3 mt-5 mb-5 p-4 text-[#1f1f1f] text-[16px]">
                  <div>
                    <h1 className="font-medium">History</h1>
                  </div>
                  <div className="">
                    Last Edited {formatDate(data?.data?.updatedAt)}
                  </div>
                  <div className="">
                    Added To Contacts {formatDate(data?.data?.createdAt)}
                  </div>
                </div>
              </div>
            </>
          </div>
          {isDelete && <SingleDeleteModal handleIsDelete={handleIsDelete} />}
        </section>
      ) : (
        <EditContact
          contactData={data?.data}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
};

export default ContactDetails;
