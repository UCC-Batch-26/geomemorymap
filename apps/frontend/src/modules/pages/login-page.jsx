import { useState } from 'react';
import { LoginForm } from '@/modules/common/components/login-form';

export function LoginPage() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <div>
      <LoginForm setToken={setToken} setUser={setUser} />
    </div>
  );
}