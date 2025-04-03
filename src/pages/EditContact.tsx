import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import {
  MdLocationOn,
  MdOutlineCake,
  MdOutlineMail,
  MdPersonOutline,
  MdPhone,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

interface ICreateContactMainProps {
  handleEdit?: () => void;
}

const EditContact: FC<ICreateContactMainProps> = ({ handleEdit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleReturn = () => {
    const returnPath = location?.state?.from || "/";
    navigate(returnPath);
  };
  return (
    <section className="lg:h-full lg:overflow-y-scroll">
      <div className="w-full lg:w-ful  xl:w-[950px] xl:p-4 ">
        <div className="flex justify-between items-center">
          <div
            onClick={handleEdit ? handleEdit : handleReturn}
            className="p-2 cursor-pointer"
          >
            <FaArrowLeft size={20} className=" text-[#444746] " />
          </div>
          <div className="flex items-center justify-end space-x-1">
            <button className="px-5 py-2 bg-blue-700 rounded-[40px] text-white">
              Save
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-start items-center mt-12 space-y-6">
          <div className="w-[100px] h-[100px] lg:w-[162px] lg:h-[162px]">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=Abdullah`}
              alt="Avatar"
              className="w-full rounded-full"
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

export default EditContact;
