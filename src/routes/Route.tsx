import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Contacts from "../pages/Contacts";
import Recent from "../pages/Recent";
import Trash from "../pages/Trash";
import Favorite from "../pages/Favorite";

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
    ],
  },
]);

export default Route;
