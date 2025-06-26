import { FC, useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaEdit,
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
import { useQuery } from '@tanstack/react-query';
import ContactServices from '../services/contacts.services';
import DateUtils from '../utils/date.utils';

const { processGetSingleContact } = ContactServices;
const { formatDate } = DateUtils;

const ContactDetails: FC = () => {
  const { id } = useParams();
  console.log(id);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleReturn = () => {
    const returnPath = location?.state?.from || '/';
    navigate(returnPath);
  };
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleIsDelete = () => {
    setIsDelete(!isDelete);
  };
  useEffect(()=>{
    console.log('hfdgf')
  },[id])
  return (
    <>
      {!isEdit ? (
        <section className="lg:h-full relative lg:overflow-y-scroll">
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
                    {isFavorite ? (
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
                      className="w-full rounded-full"
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
                    {data.data?.firstName} {data.data?.lastName}
                  </h1>
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
                        <p className="break-all">{data.data?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start justify-start space-x-3">
                      <div>
                        <MdOutlineLocalPhone size={20} />
                      </div>
                      <div className="">
                        <p className="break-all">{data.data?.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start justify-start space-x-3">
                      <div>
                        <MdOutlineLocationOn size={20} />
                      </div>
                      <div className="">
                        <p className="break-all">
                          {data.data?.streetAddress} {data?.data?.city}
                          {data?.data?.postCode} {data?.data?.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-start space-x-3">
                      <div>
                        <MdOutlineCake size={20} />
                      </div>
                      <div className="">
                        <p className="break-all">
                          {data.data?.day} {data?.data?.month}
                          {data?.data?.year}
                        </p>
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
        <EditContact handleEdit={handleEdit} />
      )}
    </>
  );
};

export default ContactDetails;
