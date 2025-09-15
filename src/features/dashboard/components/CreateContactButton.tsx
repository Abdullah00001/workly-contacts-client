'use client';
import { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const CreateContactButton: FC = () => {
  return (
    <div>
      {/* Create Contact Button */}
      <button className="bg-[#c2e7ff] font-google-sans-text font-medium text-sm cursor-pointer text-[#001D35] hover:shadow-sm  xl:px-6.5 xl:py-4.5 lg:px-5 lg:py-4 rounded-[14px] flex items-center gap-2 transition-colors">
        <AiOutlinePlus className="text-2xl" />
        <span>Create Contact</span>
      </button>
    </div>
  );
};

export default CreateContactButton;
