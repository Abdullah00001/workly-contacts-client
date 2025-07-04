import { FC } from 'react';
import { IFeedbackSuccessModal } from '../../../interfaces/feedback.interface';

const FeedbackSuccessModal: FC<IFeedbackSuccessModal> = ({
  setIsFeedbackSuccess,
}) => {
  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0 z-50"
    >
      <div className="bg-white p-6 rounded-lg md:w-96 shadow-lg text-center relative">
        {/* Close X Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          onClick={() => {
            setIsFeedbackSuccess(false);
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Success Icon */}
        <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600">
          Your feedback has been submitted successfully. We appreciate your
          input and will use it to improve our service.
        </p>
      </div>
    </div>
  );
};

export default FeedbackSuccessModal;
