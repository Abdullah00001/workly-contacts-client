'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FC } from 'react';

const CreateContactSmallButton: FC = () => {
  return (
    <button className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-200 shadow-lg  rounded-2xl transition-all duration-300 hover:bg-blue-200 active:scale-95">
      <Plus className="text-blue-900  w-6 h-6 md:w-8 md:h-8" />
    </button>
  );
};

export default CreateContactSmallButton;
