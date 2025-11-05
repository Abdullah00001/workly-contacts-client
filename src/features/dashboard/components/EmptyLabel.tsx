'use client';
import type { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useImportExportModalStore } from '@/stores/import-export-modal-store';
import Icon from '@/components/common/Icon';

interface EmptyStateProps {
  type: 'contacts';
}

const EmptyLabel: FC<EmptyStateProps> = ({ type }) => {
  const router = useRouter();
  const { toggleImportModal } = useImportExportModalStore();
  const getContent = () => {
    switch (type) {
      case 'contacts':
        return {
          icon: (
            <div className="relative w-[220px] h-[220px]">
              <img
                src={`https://ssl.gstatic.com/social/contactsui/images/labels/emptylabelicon_2x.png`}
                alt="Empty contacts"
                className="w-full h-full object-contain"
              />
            </div>
          ),
          title: 'No contacts with this label',
          description:
            'Start building your network by adding your first contact',
          actions: (
            <div className="flex items-center w-full gap-2 justify-center">
              <button
                onClick={() => router.push('/new')}
                className="flex items-center cursor-pointer justify-center gap-2 px-2 py-2 text-[#0b57d0] rounded-[24px] hover:bg-[#dbeafe] transition-colors font-google-sans-text text-sm font-medium"
              >
                <Icon name="person" size={18} variant="outlined" type="icons" />
                Create contact
              </button>
              <button
                onClick={() => toggleImportModal()}
                className="flex text-[#0b57d0] cursor-pointer items-center justify-center gap-2 text-blue px-2 py-2 rounded-[24px] hover:bg-[#dbeafe] font-google-sans-text text-sm transition-colors font-medium"
              >
                <Icon
                  name="download"
                  size={18}
                  variant="outlined"
                  type="symbols"
                />
                Import contact
              </button>
            </div>
          ),
        };
    }
  };

  const content = getContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
      <div className="mb-8">{content.icon}</div>

      <h2 className="text-[16px] font-google-sans-text text-[#1f1f1f] mb-3">
        {content.title}
      </h2>
      {content.actions && (
        <div className="animate-fadeIn">{content.actions}</div>
      )}
    </div>
  );
};

export default EmptyLabel;
