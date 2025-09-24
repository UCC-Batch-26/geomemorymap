import { createBrowserRouter, RouterProvider } from 'react-router';
import { LoginPage } from '@/modules/pages/login-page';
import { RegistrationForm } from '@/modules/pages/registration-form';

const router = createBrowserRouter([
    { path: '/', element: <LoginPage />},
    { path: '/register', element: <RegistrationForm/>},
]);

export function App() {
  return <RouterProvider router={router} />;
}
