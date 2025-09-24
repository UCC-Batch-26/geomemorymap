import { createBrowserRouter, RouterProvider } from 'react-router';
import { LoginPage } from '@/modules/sample/pages/login-page';
import { RegistrationForm } from '@/modules/sample/pages/registration-form';

const router = createBrowserRouter([
    { path: '/', element: <LoginPage />},
    { path: '/register', element: <RegistrationForm/>},
]);

export function App() {
  return <RouterProvider router={router} />;
}
