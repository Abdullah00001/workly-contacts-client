import { FC, useState } from "react";

interface IFeedbackModalProps {
  handleIsFeedback: () => void;
}

const FeedbackModal: FC<IFeedbackModalProps> = ({ handleIsFeedback }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = () => {
    console.log("Feedback submitted:", feedback); // Replace with feedback submission function
    handleIsFeedback();
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
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
            className="px-4 py-2 text-[14px] cursor-pointer bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={handleIsFeedback}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-[14px] cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSubmitFeedback}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
