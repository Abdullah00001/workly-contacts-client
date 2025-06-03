import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Contacts from '../pages/Contacts';
import Recent from '../pages/Recent';
import Trash from '../pages/Trash';
import Favorite from '../pages/Favorite';
import CreateContact from '../pages/CreateContact';
import ContactDetails from '../pages/ContactDetails';
import EditContact from '../pages/EditContact';
import Profile from '../pages/Profile';
import AvatarDropDownProvider from '../providers/AvatarDropDownProvider';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import OtpVerification from '../pages/OtpVerification';
import ProtectedRoute from '../components/Protected/ProtectedRoute';
import ProtectedVerifyPage from '../components/Protected/ProtectedVerifyPage';
import PublicRoute from '../components/Protected/PublicRoute';
import RecoverAccount from '../layouts/RecoverAccount';
import FindAccount from '../pages/FindAccount';
import VerifyRecoverOtp from '../pages/VerifyRecoverOtp';
import ResetPassword from '../pages/ResetPassword';
import FoundAndSentOtp from '../pages/FoundAndSentOtp';
import RecoverStep1Guard from '../components/Protected/RecoverStep1Guard';
import RecoverStep2Guard from '../components/Protected/RecoverStep2Guard';
import RecoverStep3Guard from '../components/Protected/RecoverStep3Guard';

const Route = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: '/verify',
    element: (
      <PublicRoute>
        <ProtectedVerifyPage>
          <OtpVerification />
        </ProtectedVerifyPage>
      </PublicRoute>
    ),
  },
  {
    path: '/recover',
    element: (
      <PublicRoute>
        <RecoverAccount />
      </PublicRoute>
    ),
    children: [
      {
        index: true,
        element: <FindAccount />,
      },
      {
        path: 'identify',
        element: (
          <RecoverStep1Guard>
            <FoundAndSentOtp />
          </RecoverStep1Guard>
        ),
      },
      {
        path: 'verify',
        element: (
          <RecoverStep2Guard>
            <VerifyRecoverOtp />
          </RecoverStep2Guard>
        ),
      },
      {
        path: 'reset',
        element: (
          <RecoverStep3Guard>
            <ResetPassword />
          </RecoverStep3Guard>
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AvatarDropDownProvider>
          <Main />
        </AvatarDropDownProvider>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Contacts />,
      },
      {
        path: 'me',
        element: <Profile />,
      },
      {
        path: 'recent',
        element: <Recent />,
      },
      {
        path: 'favorite',
        element: <Favorite />,
      },
      {
        path: 'trash',
        element: <Trash />,
      },
      {
        path: 'person/:id',
        element: <ContactDetails />,
      },
      {
        path: 'person/edit/:id',
        element: <EditContact />,
      },
      {
        path: 'new',
        element: <CreateContact />,
      },
    ],
  },
]);

export default Route;
