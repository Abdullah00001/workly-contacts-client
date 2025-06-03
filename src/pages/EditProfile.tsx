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

  const [work, setWork] = useState<{ company: string; position: string }>({
    company: "OpenAI",
    position: "Software Engineer",
  });
  const [isWorkClick, setIsWorkClick] = useState(false);

  const handleChangeWork = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWork((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Send `work` object to server here
  };

  return (
    <section className="w-full pb-4">
      <div className="flex justify-between items-center">
        <div onClick={handleReturn} className="p-2 cursor-pointer">
          <FaArrowLeft size={20} className="text-[#444746]" />
        </div>
        <h1 className="text-xl font-semibold text-[#444746] lg:text-2xl">
          Edit Profile
        </h1>
        <div className="w-8"></div> {/* Empty div for flex balance */}
      </div>
      <div className="md:flex md:flex-col md:justify-center md:items-center">
        <div className="md:w-[600px]  xl:w-[1000px] 2xl:w-[1200px] md:p-4 md:shadow-2xl md:rounded-2xl md:mt-5 lg:p-8">
          <div className="flex flex-col justify-center items-center mt-5 md:mt-0">
            <div className="w-[122px] h-[122px] lg:w-[150px] lg:h-[150px] xl:w-[180px] xl:h-[180px]">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=Abdullah`}
                alt="Avatar"
                onClick={handleAvatarClick}
                className="w-full rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                title="Click to change profile picture"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                aria-label="Upload profile picture"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 lg:text-base">
              Click image to change profile picture
            </p>
          </div>
          <div className="mt-10 px-4 lg:px-8 xl:px-12">
            <div className="flex flex-col space-y-6 lg:space-y-8">
              <form
                onSubmit={handleNameSubmit}
                className={`flex flex-col ${isNameClick && "space-y-2"}`}
              >
                <label
                  htmlFor="name"
                  className="text-gray-700 font-medium mb-1 lg:text-lg"
                >
                  Full Name
                </label>
                <div>
                  <input
                    onChange={handleChangeName}
                    onClick={() => setIsNameClick(true)}
                    value={name}
                    className="w-full px-3 py-2 rounded-lg outline-none border border-black lg:py-3 lg:text-lg"
                    type="text"
                    name="name"
                    id="name"
                    aria-label="Full Name"
                  />
                </div>
                <div
                  className={`${
                    isNameClick ? "block" : "hidden"
                  } flex justify-end items-center space-x-2`}
                >
                  <button
                    onClick={() => setIsNameClick(false)}
                    className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
              <form
                onSubmit={handleBioSubmit}
                className={`flex flex-col ${isBioClick && "space-y-2"}`}
              >
                <label
                  htmlFor="bio"
                  className="text-gray-700 font-medium mb-1 lg:text-lg"
                >
                  Bio
                </label>
                <div>
                  <textarea
                    maxLength={110}
                    onChange={handleChangeBio}
                    onClick={() => setIsBioClick(true)}
                    value={bio}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg outline-none border border-black lg:py-3 lg:text-lg"
                    name="bio"
                    id="bio"
                    aria-label="Biography"
                  />
                </div>
                <div
                  className={`${
                    isBioClick ? "block" : "hidden"
                  } flex justify-end items-center space-x-2`}
                >
                  <button
                    onClick={() => setIsBioClick(false)}
                    className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
              <form
                onSubmit={handleWorkSubmit}
                className={`flex flex-col ${isWorkClick && "space-y-2"}`}
              >
                <div className="mb-1">
                  <label className="text-gray-700 font-medium lg:text-lg">
                    Work Information
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="text-gray-600 text-sm block mb-1 lg:text-base"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      maxLength={100}
                      onChange={handleChangeWork}
                      onClick={() => setIsWorkClick(true)}
                      value={work.company}
                      placeholder="Company Name"
                      className="w-full px-3 py-2 rounded-lg outline-none border border-black lg:py-3 lg:text-lg"
                      id="company"
                      aria-label="Company Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="position"
                      className="text-gray-600 text-sm block mb-1 lg:text-base"
                    >
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      maxLength={100}
                      onChange={handleChangeWork}
                      onClick={() => setIsWorkClick(true)}
                      value={work.position}
                      placeholder="Position"
                      className="w-full px-3 py-2 rounded-lg outline-none border border-black lg:py-3 lg:text-lg"
                      id="position"
                      aria-label="Position"
                    />
                  </div>
                </div>
                <div
                  className={`${
                    isWorkClick ? "flex" : "hidden"
                  } justify-end items-center space-x-2`}
                >
                  <button
                    type="button"
                    onClick={() => setIsWorkClick(false)}
                    className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                  >
                    Save
                  </button>
                </div>
              </form>
              <form
                onSubmit={handleEmailSubmit}
                className={`flex flex-col ${isEmailClick && "space-y-2"}`}
              >
                <label
                  htmlFor="email"
                  className="text-gray-700 font-medium mb-1 lg:text-lg"
                >
                  Email Address
                </label>
                <div>
                  <input
                    type="email"
                    maxLength={100}
                    onChange={handleChangeEmail}
                    onClick={() => setIsEmailClick(true)}
                    value={email}
                    className="w-full px-3 py-2 rounded-lg outline-none border border-black lg:py-3 lg:text-lg"
                    name="email"
                    id="email"
                    aria-label="Email Address"
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
                    className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <form
                  onSubmit={handlePhoneSubmit}
                  className={`flex flex-col ${isPhoneClick && "space-y-2"}`}
                >
                  <label
                    htmlFor="phone"
                    className="text-gray-700 font-medium mb-1 lg:text-lg"
                  >
                    Phone Number
                  </label>
                  <div>
                    <input
                      type="tel"
                      maxLength={15}
                      onChange={handleChangePhone}
                      onClick={() => setIsPhoneClick(true)}
                      value={phone}
                      className="w-full px-3 py-2 rounded-lg outline-none border border-black lg:py-3 lg:text-lg"
                      name="phone"
                      id="phone"
                      aria-label="Phone Number"
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
                      className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                    >
                      Save
                    </button>
                  </div>
                </form>
                <form
                  onSubmit={handleDobSubmit}
                  className={`flex flex-col ${isDobClick && "space-y-2"}`}
                >
                  <label
                    htmlFor="dob"
                    className="text-gray-700 font-medium mb-1 lg:text-lg"
                  >
                    Date of Birth
                  </label>
                  <div>
                    <input
                      type="date"
                      onChange={handleChangeDob}
                      onClick={() => setIsDobClick(true)}
                      value={dob}
                      className="w-full px-3 py-2 rounded-lg outline-none border border-black lg:py-3 lg:text-lg"
                      name="dob"
                      id="dob"
                      aria-label="Date of Birth"
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
                      className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
              <form
                onSubmit={handleAddressSubmit}
                className={`flex flex-col ${isAddressClick && "space-y-2"}`}
              >
                <label
                  htmlFor="address"
                  className="text-gray-700 font-medium mb-1 lg:text-lg"
                >
                  Address
                </label>
                <div>
                  <input
                    type="text"
                    maxLength={150}
                    onChange={handleChangeAddress}
                    onClick={() => setIsAddressClick(true)}
                    value={address}
                    className="w-full px-3 py-2 rounded-lg outline-none border border-black lg:py-3 lg:text-lg"
                    name="address"
                    id="address"
                    aria-label="Address"
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
                    className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-blue-400 text-white rounded-lg lg:px-4 lg:py-2 lg:text-base"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
