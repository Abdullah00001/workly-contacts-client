import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import CreateContactSmall from '../components/ui/CreateContactSmall';
import LogoutModal from '../components/ui/LogoutModal';
import FeedbackModal from '../components/ui/FeedbackModal';
import useAvatarDropDown from '../hooks/useAvatarDropDownContext';
import { ToastContainer } from 'react-toastify';

const Main: FC = () => {
  const location = useLocation();

  // Hide CreateContactSmall on Contact Details page
  const isContactDetailsPage = location.pathname.startsWith('/person/');
  const isCreateContactPage = location.pathname.startsWith('/new');
  const isProfilePage = location.pathname.startsWith('/me');
  const {
    isFeedBackClicked,
    isLogOutClicked,
    setIsFeedBackClicked,
    setIsLogoutClicked,
  } = useAvatarDropDown();
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-white">
        <Header />
        <div className="hidden lg:block mt-5 h-[calc(100vh-5rem)]">
          <div className="flex h-full">
            <div className="w-[20%] xl:w-[15%] h-full overflow-y-auto">
              <Sidebar />
            </div>
            <div className="w-[80%] xl:w-[85%] p-4 border-gray-400 border-t border-l rounded-tl-[30px] h-full overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
        <div className="block px-4 py-2 relative lg:hidden h-[calc(100vh-4rem)] overflow-y-auto">
          <Outlet />
          {!isContactDetailsPage && !isCreateContactPage && !isProfilePage && (
            <div className="fixed top-[80%] left-[80%] md:left-[90%] md:top-[85%]">
              <CreateContactSmall />
            </div>
          )}
        </div>
        {isLogOutClicked && (
          <LogoutModal
            handleIsLogout={() => {
              setIsLogoutClicked(!isLogOutClicked);
            }}
          />
        )}
        {isFeedBackClicked && (
          <FeedbackModal
            handleIsFeedback={() => setIsFeedBackClicked(!isFeedBackClicked)}
          />
        )}
      </div>
    </>
  );
};

export default Main;
