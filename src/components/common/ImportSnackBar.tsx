'use client';
import { useImportSnackbarStore } from '@/stores/import-sncakbar-store';
import { FC, useState } from 'react';
import Icon from './Icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ImportSnackBar: FC = () => {
  const {
    fileName,
    isPending,
    toggleOpenImportSnackbar,
    errorMessage,
    errors,
  } = useImportSnackbarStore();

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  return (
    <>
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
            <>
              {errorMessage && errors.length > 0 ? (
                <div className="flex justify-between items-center">
                  <span className="text-[#f2f2f2] text-sm">{errorMessage}</span>
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
            </>
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
              {errorMessage && errors.length > 0 ? (
                <>
                  <button
                    onClick={() => setIsErrorModalOpen(true)}
                    className="text-blue-600 font-medium cursor-pointer"
                  >
                    See details
                  </button>
                </>
              ) : (
                <p className="text-[#1f1f1f]">{fileName}</p>
              )}
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
      <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col w-[calc(100vw-32px)] sm:w-full ">
          <DialogHeader>
            <DialogTitle>Import Errors</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 pr-2">
            <div className="space-y-3">
              {errors.map((error, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        Field:{' '}
                        <span className="text-gray-900">{error.field}</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {error.message}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded self-start">
                      {error?.row && <>Row {error.row}</>}
                      {error?.card && <>Card {error.card}</>}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImportSnackBar;
