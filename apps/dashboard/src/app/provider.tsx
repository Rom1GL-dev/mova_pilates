import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QUERY_CLIENT } from '@/lib/react-query.ts';
import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/providers/toast-provider.tsx';
import 'aos/dist/aos.css';
import { AuthProvider } from '@/lib/auth.tsx';
import 'tinymce/tinymce.min';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom/model';

import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';

import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.min.css';
import 'tinymce/skins/content/default/content.css';

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
