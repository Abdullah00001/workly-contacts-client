
import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const CreateContactButton: FC = () => {
  return (
    <div>
      {/* Create Contact Button */}
      <Button className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors">
        <AiOutlinePlus className="text-lg" />
        <span>Create Contact</span>
      </Button>
    </div>
  );
};

export default CreateContactButton;
