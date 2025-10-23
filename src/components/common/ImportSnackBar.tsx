'use client';
import { useImportSnackbarStore } from '@/stores/import-sncakbar-store';
import { FC } from 'react';
import Icon from './Icon';

const ImportSnackBar: FC = () => {
  const { fileName, isPending, toggleOpenImportSnackbar } =
    useImportSnackbarStore();
  return (
    <div className="w-[300px] text-white font-google-sans-text">
      <div className="bg-[#303030] p-4 rounded-t-[12px]">
        {isPending ? (
          <div className="flex items-center justify-start gap-3">
            <Icon
              name="upload"
              size={24}
              type="symbols"
              variant="outlined"
              className="text-[#f2f2f2]"
            />
            <span className="text-[#f2f2f2] text-sm">
              Importing contacts...
            </span>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-3">
              <Icon
                name="check_circle"
                size={24}
                variant="outlined"
                type="icons"
                className="text-[#f2f2f2]"
              />
              <span className="text-[#f2f2f2] text-sm">All done</span>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => toggleOpenImportSnackbar()}
            >
              <Icon
                name="close"
                className="text-[#f2f2f2]"
                size={24}
                type="icons"
                variant="outlined"
              />
            </button>
          </div>
        )}
      </div>
      {isPending ? (
        <div className="h-1 bg-gray-300 overflow-hidden">
          <div className="h-full bg-blue-500 animate-[progress_2s_ease-in-out_infinite]"></div>
        </div>
      ) : (
        <div className="h-1 bg-blue-500"></div>
      )}
      <div className="py-[9px] px-4 bg-[#e9eef6] rounded-b-[12px]">
        <div className="h-10 flex items-center justify-start">
          <div className="flex justify-start items-center">
            <p className="text-[#1f1f1f]">{fileName}</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
            transform: translateX(0);
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ImportSnackBar;
