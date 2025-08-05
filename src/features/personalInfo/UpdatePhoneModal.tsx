import { X, Phone } from 'lucide-react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  IProfileUpdatePayload,
  TUpdatePhoneModalProps,
} from '../../interfaces/accountcenter.interface';
import AuthServices from '../../services/auth.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const { processUpdateProfile } = AuthServices;
const UpdatePhoneModal: FC<TUpdatePhoneModalProps> = ({
  setModalType,
  phone,
}) => {
  const queryClient = useQueryClient();
  const [userPhone, setUserPhone] = useState<string>('');
  const [isChangeMade, setIsChangeMade] = useState<boolean>(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: IProfileUpdatePayload) =>
      await processUpdateProfile(payload),
    onSuccess: (data) => {
      toast.dismiss();
      const response = data?.data;
      queryClient.setQueryData(['personal_info'], (oldData: AxiosResponse) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData?.data,
            data: {
              ...oldData?.data?.data,
              phone: response.phone,
            },
          },
        };
      });
      toast.success('User Contact Phone Number updated');
      setTimeout(() => {
        setModalType(null);
      }, 1000);
    },
    onError: (error: AxiosError) => {
      console.error('User Contact Phone Number update failed:', error);
      toast.dismiss();
      toast.error(
        (error?.response?.data as { message?: string })?.message ||
          'Failed update User Contact Phone Number. Please try again.'
      );
    },
  });

  const handleSaveChanges = () => {
    if (!isChangeMade) return;
    const payload: IProfileUpdatePayload = { phone: userPhone as string };
    mutate(payload);
  };
  useEffect(() => {
    setIsChangeMade((phone || '') !== userPhone);
  }, [userPhone, phone]);
  useEffect(() => {
    setUserPhone(phone || '');
  }, [phone]);
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700/50 w-full max-w-md mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Edit Phone Number
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Update your phone number
            </p>
          </div>
          <button
            onClick={() => setModalType(null)}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors group"
          >
            <X
              size={20}
              className="text-slate-400 group-hover:text-white transition-colors"
            />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Phone size={16} className="text-slate-400" />
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              value={userPhone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                setUserPhone(value);
              }}
              name="phone"
            />
            <p className="text-xs text-slate-500">
              Used for account security and important notifications.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700/50 bg-slate-800/50">
          <button className="px-2 py-1 md:px-4 md:py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            disabled={!isChangeMade}
            className={`px-2 py-1 md:px-4 md:py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-800  ${isChangeMade ? 'cursor-pointer bg-blue-600 hover:bg-blue-500 text-white' : 'cursor-not-allowed bg-blue-600/5 hover:bg-blue-500/25 text-white'}`}
          >
            {isPending ? 'Saving . . ' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePhoneModal;
