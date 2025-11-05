'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TLayout from '@/types/layout.types';
import { useState, type FC } from 'react';

const ReactQueryProvider: FC<TLayout> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
