import { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateContactButton: FC = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/new");
  };
  return (
    <div>
      {/* Create Contact Button */}
      <button
        onClick={handleNavigate}
        className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
      >
        <AiOutlinePlus className="text-lg" />
        <span>Create Contact</span>
      </button>
    </div>
  );
};

export default CreateContactButton;
