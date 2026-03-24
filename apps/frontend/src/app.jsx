import { useState } from 'react';
import { HomePage } from '@/modules/home/pages/home-page';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AboutPage from '@/modules/home/pages/about-page';
import BaseLayout from '@/modules/home/layouts/base-layout';
import SignUpPage from '@/modules/auth/pages/sign-up-page';
import LoginPage from '@/modules/auth/pages/log-in-page';
import ContactPage from '@/modules/home/pages/contact-page';
import MemoryFormPage from './modules/home/pages/memory-form-page';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from '@/modules/utils/protected-routes';
import NotFoundPage from './modules/home/pages/not-found-page';

export function App() {
  const [_token, setToken] = useState(() => localStorage.getItem('token'));
  const [_user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage setToken={setToken} setUser={setUser} />,
    },
    {
      path: '/signup',
      element: <SignUpPage />,
    },
    {
      path: '/',
      element: <BaseLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'guest-memory',
          element: (
            <ProtectedRoute>
              <MemoryFormPage />
            </ProtectedRoute>
          ),
        },
        { path: 'about', element: <AboutPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: '2rem',
          },
        }}
      />{' '}
      {/* global-toaster */}
    </>
  );
}
