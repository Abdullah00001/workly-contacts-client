import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const EditProfile: FC = () => {
  const [name, setName] = useState<string>("Jhon Doe");
  const [bio, setBio] = useState<string>(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, pariatur iure optio tenetur et dolor nihil"
  );
  const [isNameClick, setIsNameClick] = useState(false);
  const [isBioClick, setIsBioClick] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleReturn = () => {
    const returnPath = location?.state?.from || "/";
    navigate(returnPath);
  };
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeBio = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleNameSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const handleBioSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const [email, setEmail] = useState<string>("your@email.com");
  const [isEmailClick, setIsEmailClick] = useState(false);

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    // you can send email to server here
  };
  const [phone, setPhone] = useState<string>("01234567890");
  const [isPhoneClick, setIsPhoneClick] = useState(false);

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handlePhoneSubmit = (e: FormEvent) => {
    e.preventDefault();
    // you can send phone number to server here
  };
  const [address, setAddress] = useState<string>(
    "123/A Gulshan, Dhaka, Bangladesh"
  );
  const [isAddressClick, setIsAddressClick] = useState(false);

  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleAddressSubmit = (e: FormEvent) => {
    e.preventDefault();
    // send updated address to server here
  };
  const [dob, setDob] = useState<string>("2000-01-01"); // YYYY-MM-DD format
  const [isDobClick, setIsDobClick] = useState(false);

  const handleChangeDob = (e: ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
  };

  const handleDobSubmit = (e: FormEvent) => {
    e.preventDefault();
    // send updated dob to server here
  };

  return (
    <section className="w-full  pb-4">
      <div className="flex justify-between items-center">
        <div onClick={handleReturn} className="p-2 cursor-pointer">
          <FaArrowLeft size={20} className=" text-[#444746] " />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <div className="w-[122px] h-[122px]">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=Abdullah`}
            alt="Avatar"
            onClick={handleAvatarClick}
            className="w-full rounded-full"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
      <div className="mt-10">
        <div className="flex flex-col space-y-2">
          <form onSubmit={handleNameSubmit} className="flex flex-col space-y-2">
            <div>
              <input
                onChange={handleChangeName}
                onClick={() => setIsNameClick(true)}
                value={name}
                className="w-full px-3 py-2 rounded-lg outline-none border border-black"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div
              className={`${
                isNameClick ? "block" : "hidden"
              } flex justify-end items-center space-x-2`}
            >
              <button
                onClick={() => setIsNameClick(false)}
                className="px-3 py-2 bg-blue-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 bg-blue-400 text-white rounded-lg"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
          <form onSubmit={handleBioSubmit} className="flex flex-col space-y-2">
            <div>
              <textarea
                maxLength={110}
                onChange={handleChangeBio}
                onClick={() => setIsBioClick(true)}
                value={bio}
                rows={4}
                className="w-full px-3 py-2 rounded-lg outline-none border border-black"
                name="name"
                id="name"
              />
            </div>
            <div
              className={`${
                isBioClick ? "block" : "hidden"
              } flex justify-end items-center space-x-2`}
            >
              <button
                onClick={() => setIsBioClick(false)}
                className="px-3 py-2 bg-blue-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 bg-blue-400 text-white rounded-lg"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col space-y-2"
          >
            <div>
              <input
                type="email"
                maxLength={100}
                onChange={handleChangeEmail}
                onClick={() => setIsEmailClick(true)}
                value={email}
                className="w-full px-3 py-2 rounded-lg outline-none border border-black"
                name="email"
                id="email"
              />
            </div>
            <div
              className={`${
                isEmailClick ? "flex" : "hidden"
              } justify-end items-center space-x-2`}
            >
              <button
                type="button"
                onClick={() => setIsEmailClick(false)}
                className="px-3 py-2 bg-blue-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 bg-blue-400 text-white rounded-lg"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
          <form
            onSubmit={handlePhoneSubmit}
            className="flex flex-col space-y-2"
          >
            <div>
              <input
                type="tel"
                maxLength={15}
                onChange={handleChangePhone}
                onClick={() => setIsPhoneClick(true)}
                value={phone}
                className="w-full px-3 py-2 rounded-lg outline-none border border-black"
                name="phone"
                id="phone"
              />
            </div>
            <div
              className={`${
                isPhoneClick ? "flex" : "hidden"
              } justify-end items-center space-x-2`}
            >
              <button
                type="button"
                onClick={() => setIsPhoneClick(false)}
                className="px-3 py-2 bg-blue-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 bg-blue-400 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
          <form onSubmit={handleDobSubmit} className="flex flex-col space-y-2">
            <div>
              <input
                type="date"
                onChange={handleChangeDob}
                onClick={() => setIsDobClick(true)}
                value={dob}
                className="w-full px-3 py-2 rounded-lg outline-none border border-black"
                name="dob"
                id="dob"
              />
            </div>
            <div
              className={`${
                isDobClick ? "flex" : "hidden"
              } justify-end items-center space-x-2`}
            >
              <button
                type="button"
                onClick={() => setIsDobClick(false)}
                className="px-3 py-2 bg-blue-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 bg-blue-400 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
          <form
            onSubmit={handleAddressSubmit}
            className="flex flex-col space-y-2"
          >
            <div>
              <input
                type="text"
                maxLength={150}
                onChange={handleChangeAddress}
                onClick={() => setIsAddressClick(true)}
                value={address}
                className="w-full px-3 py-2 rounded-lg outline-none border border-black"
                name="address"
                id="address"
              />
            </div>
            <div
              className={`${
                isAddressClick ? "flex" : "hidden"
              } justify-end items-center space-x-2`}
            >
              <button
                type="button"
                onClick={() => setIsAddressClick(false)}
                className="px-3 py-2 bg-blue-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 bg-blue-400 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
