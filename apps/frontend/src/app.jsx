import { HomePage } from '@/modules/home/pages/home-page';
import { SampleLayout } from '@/modules/sample/layouts/sample-layout';
import { SampleAddPage } from '@/modules/sample/pages/sample-add-page';
import { SampleIndexPage } from '@/modules/sample/pages/sample-index-page';
import { SampleViewPage } from '@/modules/sample/pages/sample-view-page';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AboutPage from './modules/home/pages/about-page';
import BaseLayout from './modules/sample/layouts/base-layout';
import SignUpPage from './modules/home/pages/sign-up-page';
import LoginPage from './modules/home/pages/log-in-page';
import ContactPage from './modules/home/pages/contact-page';

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
  {
    path: '/sample',
    element: <SampleLayout />,
    children: [
      {
        path: '',
        index: true,
        element: <SampleIndexPage />,
      },
      {
        path: ':id',
        element: <SampleViewPage />,
      },
      {
        path: 'add',
        element: <SampleAddPage />,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
