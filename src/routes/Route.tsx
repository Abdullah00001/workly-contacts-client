import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Contacts from "../pages/Contacts";
import Recent from "../pages/Recent";
import Trash from "../pages/Trash";
import Favorite from "../pages/Favorite";
import CreateContact from "../pages/CreateContact";
import ContactDetails from "../pages/ContactDetails";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Contacts />,
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
        path:"/new",
        element:<CreateContact/>
      }
    ],
  },
]);

export default Route;
