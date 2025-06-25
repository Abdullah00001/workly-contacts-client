import { FC } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import Route from './routes/Route';
import AuthProviders from './providers/AuthProviders';

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <RouterProvider router={Route}></RouterProvider>
      </AuthProviders>
    </QueryClientProvider>
  );
};

export default App;
