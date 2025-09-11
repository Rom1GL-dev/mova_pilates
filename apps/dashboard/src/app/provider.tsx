import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QUERY_CLIENT } from '@/lib/react-query.ts';
import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/providers/toast-provider.tsx';
import 'aos/dist/aos.css';
import { AuthProvider } from '@/lib/auth.tsx';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(() => QUERY_CLIENT);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
