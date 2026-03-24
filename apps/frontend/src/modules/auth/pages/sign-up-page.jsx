import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const SIGN_UP_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`;

function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const username = form.username.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const age = form.age;

    if (!username || !email || !password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(SIGN_UP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, age }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success('Registered successfully! You can login now.');
        setForm({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          age: '',
        });
        setTimeout(() => navigate('/login'), 1000);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Error connecting to server');
    }
  };

  return (
    <section className="min-h-screen w-full bg-[url(@/assets/geo-memory-map-bg.png)] bg-size-[900px] bg-no-repeat bg-center">
      <div className="min-h-screen bg-[#526b5c]/80 text-white px-4 py-8 sm:px-6 md:px-10">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
          <div className="font-display flex w-full max-w-xl flex-col gap-4 text-center md:text-left">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:pt-0 md:pr-10 md:text-7xl">
              Create New Account
            </h1>

            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:justify-start">
              <h3 className="text-lg font-semibold sm:text-xl md:text-2xl">Already Registered?</h3>
              <Link to="/login" className="text-lg text-green-500 underline hover:no-underline sm:text-xl md:text-2xl">
                Login
              </Link>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <hr className="my-2 h-px w-24 border-0 bg-white/40" />
              <span className="py-1 text-base text-white/80 sm:text-lg md:text-xl">Save memories. Pin moments.</span>
            </div>
          </div>

          <form
            className="w-full max-w-sm rounded-xl border border-white/30 bg-white/40 p-5 shadow-md backdrop-blur-sm sm:p-6"
            onSubmit={handleRegister}
          >
            <h2 className="mb-4 text-center text-xl font-bold text-gray-900">Sign Up</h2>

            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={form.username}
              placeholder="Username"
              onChange={handleChange}
              required
              className="mb-3 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-[#526b5c] focus:outline-none focus:ring-2 focus:ring-[#526b5c]/30"
            />

            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
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
              placeholder="Password"
              onChange={handleChange}
              required
              className="mb-3 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-[#526b5c] focus:outline-none focus:ring-2 focus:ring-[#526b5c]/30"
            />

            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
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
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
