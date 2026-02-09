import { Navigate } from 'react-router-dom';
import { api } from '@/lib/api.ts';
import React from 'react';
import { AxiosError } from 'axios';
import { APP_ROUTES } from '@/config/routes.config.tsx';

const getUser = async () => {
  const response = await api.get('/v1/backoffice/auth/me');
  return response.data.user;
};

interface AuthFnResponse {
  ok: boolean;
  error?: string;
}

export type UserSession = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
};

interface AuthCtx {
  user: UserSession | null;
  logout: () => Promise<AuthFnResponse>;
  loading: boolean;
}

const AuthContext = React.createContext<AuthCtx>({} as AuthCtx);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = React.useState<UserSession | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = React.useCallback(async () => {
    try {
      await api.post('/v1/auth/logout');
      setUser(null);
      return { ok: true };
    } catch (error) {
      if (error instanceof AxiosError) {
        return { ok: false, error: error.response?.data.message };
      }
      return { ok: false, error: 'An error occurred' };
    }
  }, [setUser]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useMe = () => {
  const { user } = useAuth();
  return user!;
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={APP_ROUTES.login.path} replace />;
  }

  return <>{children}</>;
};
