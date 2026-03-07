import { Navigate } from 'react-router';

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const isGuest = sessionStorage.getItem('guest') === 'true';

  if (!token && !isGuest) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
