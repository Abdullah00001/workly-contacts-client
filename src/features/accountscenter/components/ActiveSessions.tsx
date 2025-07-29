import { FC } from 'react';

const ActiveSessions: FC = () => {
  return (
    <div className="w-full  mt-4 mb-4 border border-gray-500 p-4 rounded-[8px]">
      <h5 className="font-medium text-[16px]">Active Sessions</h5>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                OS
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Browser
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Location
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Last Use
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-1 px-4"></td>
              <td className="py-1 px-4"></td>
              <td className="py-1 px-4"></td>
            </tr>
            <tr className="bg-gray-50/4 cursor-pointer hover:bg-gray-50/15 transition-colors">
              <td className="py-3 px-4 text-white">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Linux</span>
                </div>
              </td>
              <td className="py-3 px-4 text-white">
                <div className="flex items-center">
                  <span className="text-sm">Google Chrome</span>
                </div>
              </td>
              <td className="py-3 px-4 text-white text-sm">
                Dhaka, Bangladesh
              </td>
              <td className="py-3 px-4 text-white text-sm">23 minutes ago</td>
              <td className="py-3 px-4">
                <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-2 px-3 cursor-pointer rounded transition-colors">
                  Logout
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveSessions;
