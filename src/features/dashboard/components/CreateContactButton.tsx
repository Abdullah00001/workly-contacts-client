'use client';
import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const CreateContactButton: FC = () => {
  return (
    <div>
      {/* Create Contact Button */}
      <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white xl:px-6.5 xl:py-4.5 lg:px-5 lg:py-4 rounded-[14px] flex items-center gap-2 transition-colors">
        <AiOutlinePlus className="text-2xl" />
        <span>Create Contact</span>
      </button>
    </div>
  );
};

export default CreateContactButton;
