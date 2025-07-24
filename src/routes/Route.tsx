import { createBrowserRouter } from 'react-router-dom';
import Contacts from '../pages/Contacts';
import Trash from '../pages/Trash';
import Favorite from '../pages/Favorite';
import CreateContact from '../pages/CreateContact';
import ContactDetails from '../pages/ContactDetails';
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
import PersonEdit from '../pages/PersonEdit';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import HelpCenter from '../pages/HelpCenter';
import ContactUs from '../pages/ContactUs';
import withPublicLayout from '../utils/withPublicLayout';
import RootRedirectHandler from '../components/Protected/RootRedirectHandler';
import SignupRouteWrapper from '../components/Protected/SignupRouteWrapper';
import LoginRouteWrapper from '../components/Protected/LoginRouteWrapper';
import PersonalInfo from '../pages/PersonalInfo';
import AccountsCenterProtectedRoute from '../components/Protected/AccountsCenterProtectedRoute';

const Route = createBrowserRouter([
  {
    path: '/privacy',
    element: withPublicLayout(<PrivacyPolicy />),
  },
  {
    path: '/terms',
    element: withPublicLayout(<TermsOfService />),
  },
  {
    path: '/help',
    element: withPublicLayout(<HelpCenter />),
  },
  {
    path: '/contact',
    element: withPublicLayout(<ContactUs />),
  },
  {
    path: '/login',
    element: <LoginRouteWrapper />,
  },
  {
    path: '/signup',
    element: <SignupRouteWrapper />,
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
    path: '/accountscenter',
    element: (
      <ProtectedRoute>
        <AccountsCenterProtectedRoute />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PersonalInfo />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RootRedirectHandler />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Contacts />,
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
        element: <PersonEdit />,
      },
      {
        path: 'new',
        element: <CreateContact />,
      },
    ],
  },
]);

export default Route;
