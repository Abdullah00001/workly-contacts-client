import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Contacts from "../pages/Contacts";
import Recent from "../pages/Recent";
import Trash from "../pages/Trash";
import Favorite from "../pages/Favorite";
import CreateContact from "../pages/CreateContact";
import ContactDetails from "../pages/ContactDetails";
import EditContact from "../pages/EditContact";
import Profile from "../pages/Profile";
import AvatarDropDownProvider from "../providers/AvatarDropDownProvider";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import OtpVerification from "../pages/OtpVerification";

const Route = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/verify",
    element: <OtpVerification />,
  },
  {
    path: "/",
    element: (
      <AvatarDropDownProvider>
        <Main />
      </AvatarDropDownProvider>
    ),
    children: [
      {
        path: "/",
        element: <Contacts />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/recent",
        element: <Recent />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/trash",
        element: <Trash />,
      },
      {
        path: "/person/:id",
        element: <ContactDetails />,
      },
      {
        path: "/person/edit/:id",
        element: <EditContact />,
      },
      {
        path: "/new",
        element: <CreateContact />,
      },
    ],
  },
]);

export default Route;
