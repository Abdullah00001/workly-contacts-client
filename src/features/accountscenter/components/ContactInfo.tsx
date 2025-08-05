import { FC, useState } from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { TContactsInfoPageProps } from '../../../interfaces/accountcenter.interface';
import UpdatePhoneModal from '../../personalInfo/UpdatePhoneModal';

const ContactInfo: FC<TContactsInfoPageProps> = ({
  email,
  phone,
  modalType,
  setModalType,
}) => {
  const [showEmailTooltip, setShowEmailTooltip] = useState<boolean>(false);

  const handleEmailClick = () => {
    setShowEmailTooltip(true);
    // Auto-hide tooltip after 3 seconds
    setTimeout(() => {
      setShowEmailTooltip(false);
    }, 3000);
  };
  return (
    <div className="w-full mt-4 border border-gray-500 lg:px-4 lg:pt-6 lg:pb-4 p-4 rounded-[8px]">
      <h5 className="font-medium text-[16px]">Contact Info</h5>
      <div className="mt-2">
        <div className="relative">
          <div
            onClick={handleEmailClick}
            // onMouseEnter={() => setShowEmailTooltip(true)}
            // onMouseLeave={() => setShowEmailTooltip(false)}
            className="flex transition-all duration-300 lg:cursor-pointer lg:hover:bg-gray-50/5 lg:p-2 lg:border-b lg:border-gray-400 items-center justify-between w-full"
          >
            <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
              <h6 className="text-xs font-medium min-[620px]:w-[50%]">Email</h6>
              <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
                {email}
              </h5>
            </div>
            <div className="flex justify-end min-[620px]:w-[40%]">
              <ChevronRight
                size={25}
                className="transition-transform duration-200 hover:translate-x-1 text-gray-400"
              />
            </div>
          </div>
          {showEmailTooltip && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle
                    size={16}
                    className="text-red-500 flex-shrink-0"
                  />
                  <p className="text-sm text-red-700 font-medium">
                    Email cannot be changed
                  </p>
                </div>
                <p className="text-xs text-red-600 mt-1 ml-6">
                  Your email address is permanent and cannot be modified for
                  security reasons.
                </p>
              </div>
            </div>
          )}
        </div>
        <hr className="lg:hidden mt-3 mb-3 text-gray-400" />
        <div
          onClick={() => setModalType('phone')}
          className="flex transition-all duration-300 lg:cursor-pointer lg:hover:bg-gray-50/5 lg:p-2 items-center justify-between w-full"
        >
          <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
            <h6 className="text-xs font-medium min-[620px]:w-[50%]">Phone</h6>
            {phone ? (
              <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
                {phone}
              </h5>
            ) : (
              <h5 className="text-[16px] text-blue-500 font-normal mt-1 min-[620px]:w-[50%]">
                Add phone
              </h5>
            )}
          </div>
          <div className="flex justify-end min-[620px]:w-[40%]">
            <ChevronRight
              size={25}
              className="transition-transform duration-200 hover:translate-x-1 text-gray-400"
            />
          </div>
        </div>
      </div>
      {modalType === 'phone' && (
        <UpdatePhoneModal phone={phone} setModalType={setModalType} />
      )}
    </div>
  );
};

export default ContactInfo;
