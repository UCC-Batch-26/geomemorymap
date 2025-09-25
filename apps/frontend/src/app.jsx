import { createBrowserRouter, RouterProvider } from 'react-router';
import { RegistrationForm } from '@/modules/pages/registration-form';
import { LoginForm } from './modules/common/components/login-form';

const router = createBrowserRouter([
  { path: '/', element: <LoginForm /> },
  { path: '/register', element: <RegistrationForm /> },
]);

export function App() {
  return <RouterProvider router={router} />;
}
