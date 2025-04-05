import { FC } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Profile: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleReturn = () => {
    const returnPath = location?.state?.from || "/";
    navigate(returnPath);
  };
  return (
    <section className="w-full  py-4">
      <div className="flex justify-between items-center">
        {/* Left Arrow Icon */}
        <div onClick={handleReturn} className="p-2 cursor-pointer">
          <FaArrowLeft size={20} className=" text-[#444746] " />
        </div>
        <div className="p-2 cursor-pointer">
          <FaEdit size={20} className=" text-[#444746] " />
        </div>
      </div>
      <div className="md:flex md:justify-center md:items-center md:h-[80vh]">
        <div className="md:p-4 lg:p-6 md:w-[500px] md:shadow-2xl md:rounded-2xl">
          <div className=" flex justify-between items-center mt-10 md:mt-0">
            <div className="w-[122px] h-[122px]">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=Abdullah`}
                alt="Avatar"
                className="w-full rounded-full"
              />
            </div>
            <div className="flex flex-col justify-end">
              <div>
                <h1 className="font-bold text-[16px]">Software Engineer</h1>
              </div>
              <div>
                <h4 className="font-semibold text-[14px]">Brain Station</h4>
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <h1 className="text-2xl font-bold text-wrap">Jhon Doe</h1>
            <p className="font-normal text-[14px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              pariatur iure optio tenetur et dolor nihil
            </p>
          </div>
          <div className="flex flex-col justify-start space-y-3 mt-5">
            <div className="flex flex-col justify-start space-y-3">
              <div className=" space-y-1">
                <h1 className="font-bold">Email</h1>
                <p className="">abdullahbinomarchowdhury02@gmail.com</p>
              </div>
              <div className=" space-y-1">
                <h1 className="font-bold">Phone</h1>
                <p className="">01937868838</p>
              </div>
            </div>
            <div className="flex flex-col justify-start space-y-3">
              <div className=" space-y-1">
                <h1 className="font-bold">Location</h1>
                <p className="">Khilkhet,Dhaka,Bangladesh</p>
              </div>
              <div className=" space-y-1">
                <h1 className="font-bold">Date Of Birth</h1>
                <p className="">19 January 2004</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full space-y-2 mt-7 justify-center md:flex-row md:justify-start md:items-center md:space-y-0  md:space-x-2 ">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
              Change Password
            </button>
            <button className="px-4 py-2 rounded-lg bg-red-500 text-white">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
