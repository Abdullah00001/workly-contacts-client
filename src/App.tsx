import { FC } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import Route from "./routes/Route";

const App: FC = () => {
  return <RouterProvider router={Route}></RouterProvider>;
};

export default App;
