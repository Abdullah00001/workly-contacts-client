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
        path: '/',
        element: <Contacts />,
      },
      {
        path: '/me',
        element: <Profile />,
      },
      {
        path: '/recent',
        element: <Recent />,
      },
      {
        path: '/favorite',
        element: <Favorite />,
      },
      {
        path: '/trash',
        element: <Trash />,
      },
      {
        path: '/person/:id',
        element: <ContactDetails />,
      },
      {
        path: '/person/edit/:id',
        element: <EditContact />,
      },
      {
        path: '/new',
        element: <CreateContact />,
      },
    ],
  },
]);

export default Route;
