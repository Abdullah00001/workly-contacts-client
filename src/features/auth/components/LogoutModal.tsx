'use client';
import { useLogoutModalStore } from '@/stores/logout-modal-store';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { LogoutService } from '@/features/auth/service/auth-service';

/**
 *  Logout Modal For Logout Functionality
 **/
const LogoutModal: FC = () => {
  const { setLogoutModalOpen } = useLogoutModalStore();
  const { isPending, mutate } = useMutation({
    mutationFn: async () => await LogoutService(),
    onSuccess: (data) => {
      setLogoutModalOpen(false);
      window.location.href = '/';
    },
  });
  const handleLogout = () => {
    mutate();
  };
  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0"
    >
      <div className="bg-white p-5 rounded-lg md:p-6 md:w-96 shadow-lg">
        <h2 className="text-lg font-semibold">Logout from your account?</h2>
        <p className="mt-2 text-gray-600">
          You will be logged out of this session. Are you sure you want to log
          out?
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-[14px] cursor-pointer bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={() => setLogoutModalOpen(false)}
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            onClick={handleLogout}
            className="px-4 py-2 text-[14px] cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            {isPending ? 'Processing...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
