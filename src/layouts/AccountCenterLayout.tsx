import { FC } from 'react';
import PageTitle from '../utils/PageTitle';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AccountCenterSideBar from '../components/ui/sidebar/AccountCenterSideBar';
import AccountCenterNavbar from '../components/ui/header/AccountCenterNavbar';
import { X } from 'lucide-react';

const AccountCenterLayout: FC = () => {
  const navigate = useNavigate();
  const handleCloseClick = () => {
    navigate('/');
  };
  return (
    <>
      <PageTitle
        title="Accounts Center"
        description="account center page for per user"
      />
      <ToastContainer position="top-center" />
      {/* Laptop And Desktop Device Layout */}
      <div className="hidden lg:block fixed inset-0 text-white w-screen h-screen overflow-hidden bg-[#152127]">
        <div className="max-w-[1068px] lg:px-5  mx-auto h-screen">
          <div className="flex h-full">
            <aside className="w-[32%] border-r-[1px] border-gray-500 h-full pr-[32px]">
              <AccountCenterSideBar />
            </aside>
            <main className="w-[68%] pl-[34px] h-full ">
              <div className="mt-15">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
        <div
          onClick={handleCloseClick}
          className="absolute cursor-pointer top-5 left-[90%] lg:left-[95%]"
        >
          <X size={28} />
        </div>
      </div>
      {/* Tablet And Mobile Device Layout */}
      <div className="block lg:hidden text-white bg-[#152127] min-h-screen">
        <header className="sticky top-0 z-50 bg-[#152127]">
          <AccountCenterNavbar />
        </header>
        <main className="overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AccountCenterLayout;
