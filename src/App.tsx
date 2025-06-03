import { FC } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { RouterProvider } from 'react-router-dom';
import Route from './routes/Route';
import AuthProviders from './providers/AuthProviders';

const App: FC = () => {
  return (
    <AuthProviders>
      <RouterProvider router={Route}></RouterProvider>
    </AuthProviders>
  );
};

export default App;
