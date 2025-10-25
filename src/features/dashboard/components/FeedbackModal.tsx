'use client';
import { useFeedbackModalStore } from '@/stores/feedback-modal-store';
import { useMutation } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { TFeedbackPayload } from '../types/type';
import { SendFeedback } from '../services/avatar-services';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

/**
 * This Component Didn't Accept Any Props And Didn't Return Any Data
 * Feedback Modal For Take User Experience And Thought About The System.
 **/
const FeedbackModal: FC = () => {
  const [feedback, setFeedback] = useState<string>('');
  const { setFeedbackModalOpen } = useFeedbackModalStore();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: TFeedbackPayload) =>
      await SendFeedback(payload),
    onSuccess: (data) => {
      setIsSuccess(true);
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message, {
          closeButton: false,
          position: 'bottom-center',
        });
      toast.error('Unwanted error occurred,Try Again!');
    },
  });
  const disabled = isPending || feedback.length === 0;
  const handleSubmit = () => {
    if (feedback.length === 0) return;
    mutate({ message: feedback });
  };
  useEffect(() => {
    if (isPending) {
      toast('Working...', { closeButton: false, position: 'bottom-center' });
    }
  }, [isPending]);
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setFeedbackModalOpen(false);
      }, 3000);
    }
  }, [isSuccess, setFeedbackModalOpen]);
  if (isSuccess)
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
              setFeedbackModalOpen(false);
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
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600">
            Your feedback has been submitted successfully. We appreciate your
            input and will use it to improve our service.
          </p>
        </div>
      </div>
    );
  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0"
    >
      <div className="bg-white p-5 rounded-lg md:p-6 md:w-96 shadow-lg">
        <h2 className="text-lg font-semibold">We Value Your Feedback</h2>
        <p className="mt-2 text-gray-600">
          Please let us know what you think. Your feedback helps us improve.
        </p>
        <div className="mt-4">
          <label className="block text-gray-700">Your Feedback</label>
          <textarea
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here..."
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => setFeedbackModalOpen(false)}
            className="px-4 py-2 text-[14px] cursor-pointer bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className={`px-4 py-2 text-[14px] rounded-lg bg-blue-600 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer text-white hover:bg-blue-700'}`}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
