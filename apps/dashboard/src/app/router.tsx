import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoot } from './routes/app/root.tsx';
import { APP_ROUTES } from '../config/routes.config.tsx';
import { NotFoundRoute } from '@/app/routes/not-found.tsx';
import LoginRoute from '@/app/routes/login/login.tsx';
import { ProtectedRoute } from '@/lib/auth.tsx';
import UserRoot from '@/app/routes/users/users.tsx';
import UserDetailsRoot from '@/app/routes/users/users-details.tsx';
import TypeCourseRoot from '@/app/routes/type-course/type-course.tsx';
import TypeCourseDetailsRoot from '@/app/routes/type-course/type-course-details.tsx';
import PackRoot from '@/app/routes/packs/packs.tsx';
import PackDetailsRoot from '@/app/routes/packs/pack-details.tsx';
import SessionsRoot from '@/app/routes/sessions/sessions.tsx';
import SessionDetailsRoot from '@/app/routes/sessions/session-details.tsx';
import LogsRoute from '@/app/routes/log/logs.tsx';

const queryClient = new QueryClient();

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: APP_ROUTES.app.getHref(),
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          lazy: async () => {
            const { AppRoute } = await import('./routes/app/app');
            return { Component: AppRoute };
          }
        }
      ]
    },
    {
      path: APP_ROUTES.users.getHref(),
      element: <UserRoot />
    },
    {
      path: APP_ROUTES.users.details.getHref(),
      element: <UserDetailsRoot />
    },
    {
      path: APP_ROUTES.typesCourse.getHref(),
      element: <TypeCourseRoot />
    },
    {
      path: APP_ROUTES.typesCourse.details.getHref(),
      element: <TypeCourseDetailsRoot />
    },
    {
      path: APP_ROUTES.packs.getHref(),
      element: <PackRoot />
    },
    {
      path: APP_ROUTES.packs.details.getHref(),
      element: <PackDetailsRoot />
    },
    {
      path: APP_ROUTES.sessions.getHref(),
      element: <SessionsRoot />
    },
    {
      path: APP_ROUTES.sessions.details.getHref(),
      element: <SessionDetailsRoot />
    },
    {
      path: APP_ROUTES.login.getHref(),
      element: <LoginRoute />
    },
    {
      path: APP_ROUTES.logs.getHref(),
      element: <LogsRoute />
    },
    {
      path: '*',
      element: <NotFoundRoute />
    }
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
