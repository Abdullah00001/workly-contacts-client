'use client';
import LogoutModal from '@/features/auth/components/LogoutModal';
import { useFeedbackModalStore } from '@/stores/feedback-modal-store';
import { useLogoutModalStore } from '@/stores/logout-modal-store';
import type { FC } from 'react';
import FeedbackModal from '@/features/dashboard/components/FeedbackModal';
import { useLabelModalStore } from '@/stores/label-modal-store';
import LabelModal from '@/features/dashboard/components/LabelModal';
import { useImportExportModalStore } from '@/stores/import-export-modal-store';
import ImportModal from '@/features/dashboard/components/ImportModal';
import ExportModal from '@/features/dashboard/components/ExportModal';

const ModalHolders: FC = () => {
  const { isLogoutModalOpen } = useLogoutModalStore();
  const { isFeedbackModalOpen } = useFeedbackModalStore();
  const { isCreateLabelModalOpen, isRenameLabelModalOpen } =
    useLabelModalStore();
  const { isExportModalOpen, isImportModalOpen } = useImportExportModalStore();
  return (
    <>
      {isLogoutModalOpen && <LogoutModal />}
      {isFeedbackModalOpen && <FeedbackModal />}
      {(isCreateLabelModalOpen && <LabelModal />) ||
        (isRenameLabelModalOpen && <LabelModal />)}
      {isImportModalOpen && <ImportModal />}
      {isExportModalOpen && <ExportModal />}
    </>
  );
};

export default ModalHolders;
