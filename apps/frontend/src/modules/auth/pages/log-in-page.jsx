import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

const LOGIN_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;

function LoginPage({ setToken, setUser }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = form.username.trim();
    const password = form.password;

    if (!username || !password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        setUser(data.user);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        toast.success('Logged in successfully!');
        setLoggedIn(true);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error connecting to server');
    }
  };

  useEffect(() => {
    if (loggedIn) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loggedIn, navigate]);

  return (
    <section className="min-h-screen w-full bg-[url(@/assets/geo-memory-map-bg.png)] bg-[length:600px] bg-no-repeat bg-center">
      <div className="min-h-screen bg-[#526b5c]/80 text-white px-4 py-8 sm:px-6 md:px-10">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
          <div className="font-display flex w-full max-w-xl flex-col gap-4 text-center md:text-left">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:pr-10 md:text-7xl">Login</h1>

            <h3 className="text-lg font-semibold sm:text-xl md:text-2xl">Sign in to continue</h3>

            <div className="flex flex-col items-center md:items-start">
              <hr className="my-2 h-px w-24 border-0 bg-white/40" />
              <span className="py-1 text-base text-white/80 sm:text-lg md:text-xl">
                Discover your world&apos;s stories—pin your memories, share your moments, and bring your map to life!
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:justify-start">
              <h3 className="text-lg font-semibold sm:text-xl md:text-2xl">Don&apos;t have an account?</h3>
              <Link to="/signup" className="text-lg text-green-500 underline hover:no-underline sm:text-xl md:text-2xl">
                Register
              </Link>
            </div>
          </div>

          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm rounded-xl border border-white/30 bg-white/40 p-5 shadow-md backdrop-blur-sm sm:p-6"
          >
            <h2 className="mb-4 text-center text-xl font-bold text-gray-900">Login</h2>

            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="mb-3 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-[#526b5c] focus:outline-none focus:ring-2 focus:ring-[#526b5c]/30"
            />

            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="mb-3 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-[#526b5c] focus:outline-none focus:ring-2 focus:ring-[#526b5c]/30"
            />

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm text-gray-700">
                Show Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#EF6B48] px-4 py-2 text-white transition hover:bg-[#e9542b]"
            >
              Login
            </button>

            <div className="my-4 border-t border-white/40"></div>

            <div className="text-center">
              <p className="mb-3 font-semibold text-[#526b5c]">Continue as Guest</p>

              <button
                type="button"
                onClick={() => {
                  setUser({ username: 'Guest' });
                  setToken(null);
                  sessionStorage.setItem('guest', 'true');
                  toast.success('Continuing as Guest');
                  navigate('/guest-memory');
                }}
                className="w-full rounded-md bg-gray-200 py-2 text-gray-700 transition hover:bg-gray-300"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
