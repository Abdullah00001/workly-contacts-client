import { FC } from 'react';
import SecurityOverview from '../features/accountscenter/components/SecurityOverview';
import ActiveSessions from '../features/accountscenter/components/ActiveSessions';

const SecurityAndPassword: FC = () => {
  return (
    <div className="px-4 min-h-screen w-full">
      <div className="mt-4 w-auto">
        <h1 className="font-semibold text-[24px] text-wrap">
          Keep your Account safe and secure
        </h1>
        <p className="text-[16px]  text-wrap mt-1 font-normal text-gray-300">
          Update your password, monitor logged-in devices, and review recent
          activity to keep your account safe and under your control.
        </p>
      </div>
      <SecurityOverview />
      <ActiveSessions />
    </div>
  );
};

export default SecurityAndPassword;
