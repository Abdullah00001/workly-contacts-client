import { Plus } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const CreateContactSmall: FC = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/create-contact");
  };
  return (
    <button
      onClick={handleNavigate}
      className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 shadow-lg shadow-gray-300 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:bg-blue-200 active:scale-95"
    >
      <Plus className="text-blue-900 w-6 h-6 md:w-8 md:h-8" />
    </button>
  );
};

export default CreateContactSmall;
