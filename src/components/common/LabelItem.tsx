'use client';
import { TLabel } from '@/features/dashboard/types/type';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import type {
  ChangeEvent,
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
} from 'react';
import Icon from './Icon';

export type TLabelItem = {
  label: TLabel;
  selectLabel: string[];
  setSelectLabel: Dispatch<SetStateAction<string[]>>;
};

const LabelItem: FC<TLabelItem> = ({ label, selectLabel, setSelectLabel }) => {
  const { _id, labelName } = label;
  const isSelected = selectLabel.includes(_id);
  const handleSelect = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setSelectLabel((prev) =>
      isSelected ? prev.filter((labelId) => labelId !== _id) : [...prev, _id]
    );
  };
  return (
    <DropdownMenuItem
      onClick={handleSelect}
      key={_id}
      className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 !rounded-none flex justify-between items-center cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <Icon
          name="label"
          variant="filled"
          className=" text-[#444746]"
          size={22}
          type="symbols"
        />
        <span>{labelName}</span>
      </div>
      {isSelected && (
        <Icon
          name="check"
          variant="filled"
          className=" text-[#0b57d0]"
          size={22}
          type="symbols"
        />
      )}
    </DropdownMenuItem>
  );
};

export default LabelItem;
