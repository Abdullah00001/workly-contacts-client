'use client';
import Icon from '@/components/common/Icon';
import { useImportExportModalStore } from '@/stores/import-export-modal-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { ChangeEvent, useEffect, useRef, useState, type FC } from 'react';
import { ImportContacts } from '../services/contacts-service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useImportSnackbarStore } from '@/stores/import-sncakbar-store';

const ImportModal: FC = () => {
  const { setFileName, setIsPending, setOpenImportSnackbar } =
    useImportSnackbarStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toggleImportModal, setImportModalOpen } = useImportExportModalStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: FormData) => await ImportContacts(payload),
    onSuccess: (data) => {
      setIsPending(false);
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      router.push('/dashboard');
      setImportModalOpen(false);
    },
    onError: (error) => {},
  });
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };
  const handleImportClick = () => {
    if (selectedFile) {
      const payload: FormData = new FormData();
      payload.append('docsFile', selectedFile);
      mutate(payload);
      setFileName(selectedFile.name);
      setIsPending(true);
      setOpenImportSnackbar(true);
      setImportModalOpen(false);
    }
  };
  useEffect(() => {
    if (isPending) {
      setIsPending(isPending);
    }
  }, [isPending]);
  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0"
    >
      <div className="bg-white rounded-[18px] w-96 shadow-lg ">
        <div className="p-5 md:p-6">
          <h2 className="text-[1.5rem] font-normal font-google-sans text-[#444746]">
            Import contacts
          </h2>
          <p className="my-5 text-[#444746] text-sm font-google-sans font-normal ">
            To get started, select a file. <br /> Use a CSV or vCard format or
            our{' '}
            <Link
              className="text-[#0b57d0]"
              href={
                'https://docs.google.com/spreadsheets/d/1-rexrA7Dt6D26IBAvbDzcwykV9cUcp2laOiqJ6tf6c4/edit?gid=703932592#gid=703932592'
              }
            >
              template
            </Link>
            .
          </p>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.vcf"
              onChange={handleFileChange}
              className="hidden"
            />
            {selectedFile ? (
              <>
                <div className="flex items-center justify-start gap-2">
                  <Icon
                    name="check_circle"
                    size={20}
                    type="icons"
                    variant="filled"
                    className="text-[#146c2e]"
                  />
                  <span>{selectedFile.name}</span>
                  <button
                    onClick={removeFile}
                    className="flex justify-center items-center w-[25px] h-[25px] rounded-full hover:cursor-pointer hover:bg-[#44474614] "
                  >
                    <Icon
                      name="close"
                      size={20}
                      type="icons"
                      variant="outlined"
                      className="text-[#444746]"
                    />
                  </button>
                </div>
                <div className="py-1 px-2 bg-[#c4eed0] rounded-[4px] mt-4">
                  <p className="text-[#444746] font-google-sans-text text-sm font-normal">
                    File successfully uploaded. Click Import below to start
                    importing.
                  </p>
                </div>
              </>
            ) : (
              <button
                onClick={openFileDialog}
                className="px-7 py-3 cursor-pointer hover:opacity-90 bg-[#0b57d0] text-white font-medium text-sm font-google-sans-text rounded-[22px]"
              >
                Select File
              </button>
            )}
          </div>
        </div>
        <div className="px-5 pb-5 md:px-6 md:pb-6">
          <div className="flex justify-end items-center mt-6 gap-1">
            <button
              onClick={() => toggleImportModal()}
              className="text-[#0b57d0] px-4 py-2 rounded-[16px] cursor-pointer font-google-sans text-sm font-medium text-center hover:bg-[rgba(11,87,208,0.08)]"
            >
              Cancel
            </button>
            <button
              onClick={handleImportClick}
              disabled={!selectedFile || isPending}
              className={` px-4 py-2 rounded-[16px] font-google-sans text-sm font-medium text-center  ${selectedFile && !isPending ? 'hover:bg-[rgba(11,87,208,0.08)] text-[#0b57d0] cursor-pointer' : 'text-[#1f1f1f] opacity-65'}`}
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
