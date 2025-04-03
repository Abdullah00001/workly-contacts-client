import { FC, useState } from "react";
import {
  FaArrowLeft,
  FaEdit,
  FaRegStar,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import {
  MdOutlineCake,
  MdOutlineEmail,
  MdOutlineLocalPhone,
  MdOutlineLocationOn,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const ContactDetails: FC = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const handleReturn = () => {
    const returnPath = location?.state?.from || "/";
    navigate(returnPath);
  };
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center">
          {/* Left Arrow Icon */}
          <div onClick={handleReturn} className="p-2 cursor-pointer">
            <FaArrowLeft size={20} className=" text-[#444746] " />
          </div>

          {/* Right side icons (Favorite, Edit, Delete) */}
          <div className="flex items-center justify-end space-x-1">
            <div className="p-2 cursor-pointer">
              {isFavorite ? (
                <span className=" text-blue-600 " onClick={handleFavorite}>
                  <FaStar size={20} />
                </span>
              ) : (
                <span onClick={handleFavorite} className=" text-[#444746] ">
                  <FaRegStar size={20} />
                </span>
              )}
            </div>
            <div className="p-2 cursor-pointer">
              <FaEdit size={20} className=" text-[#444746] " />
            </div>
            <div className="p-2 cursor-pointer">
              <FaTrash size={20} className=" text-[#444746] " />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-[50px] space-y-7">
          <div className="w-[112px] h-[112px] cursor-pointer">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=Abdullah`}
              alt="Avatar"
              className="w-full rounded-full"
            />
          </div>
          <div>
            <h1 className="text-center text-wrap text-2xl">
              Abdullah Bin Omar Chowdhury
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center mt-5">
          <div className="flex flex-col justify-start space-y-4  p-4 bg-[#f0f4f9] rounded-[12px] text-[#1f1f1f]">
            <div>
              <h1 className="text-[16px]  font-medium">Contact Details</h1>
            </div>
            <div className="flex items-start justify-start space-x-3">
              <div>
                <MdOutlineEmail size={20} />
              </div>
              <div className="">
                <p className="break-all">
                  abdullahbinomarchowdhury02@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-start justify-start space-x-3">
              <div>
                <MdOutlineLocalPhone size={20} />
              </div>
              <div className="">
                <p className="break-all">01937868838</p>
              </div>
            </div>
            <div className="flex items-start justify-start space-x-3">
              <div>
                <MdOutlineLocationOn size={20} />
              </div>
              <div className="">
                <p className="break-all">Unus Optics,Khilkhet,Dhaka 1229,BD</p>
              </div>
            </div>
            <div className="flex items-start justify-start space-x-3">
              <div>
                <MdOutlineCake size={20} />
              </div>
              <div className="">
                <p className="break-all">04 June 2002</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 mt-5 mb-5 p-4 text-[#1f1f1f] text-[16px]">
          <div>
            <h1 className="font-medium">History</h1>
          </div>
          <div className="">Last Edited 3 April 2025</div>
          <div className="">Added To Contacts 1 April 2025</div>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
