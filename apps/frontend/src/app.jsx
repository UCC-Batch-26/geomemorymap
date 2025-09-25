import { HomePage } from '@/modules/home/pages/home-page';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AboutPage from '@/modules/home/pages/about-page';
import BaseLayout from '@/modules/home/layouts/base-layout';
import SignUpPage from '@/modules/auth/pages/sign-up-page';
import LoginPage from '@/modules/auth/pages/log-in-page';
import ContactPage from '@/modules/home/pages/contact-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
