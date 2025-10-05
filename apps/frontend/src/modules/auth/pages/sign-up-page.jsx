import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

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
      alert('Please fill in all required fields.');
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
        setForm({ username: '', email: '', password: '', age: '' });
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
    <section className="fixed bg-[url(@/assets/geo-memory-map-bg.png)] bg-size-[900px] bg-no-repeat bg-center h-screen w-full">
      <div className="flex items-center justify-center min-h-screen bg-[#526b5c]/80 text-white">
        <div className=" font-display flex flex-col justify-center-safe gap-5 text-left">
          <h1 className="text-7xl font-semibold pt-20 pr-20">Create New Account</h1>

          <div className="flex flex-row items-center gap-2">
            <h3 className="text-2xl font-semibold">Already Registered?</h3>
            <a className="text-green-500  text-2xl underline hover:no-underline" href="/login">
              Login
            </a>
          </div>

          <div className="flex flex-col">
            <hr className="w-24 h-px my-2 bg-white/40 border-0 self-start" />
            <span className="py-2 text-xl text-white/80">Save memories. Pin moments.</span>
          </div>
        </div>

        <form className="bg-white border rounded-lg p-6 w-80 shadow-md" onSubmit={handleRegister}>
          <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
          />

          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
          />

          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
          />

          {/* Show password toggle affecting both fields */}
          <div className="flex items-center mb-4">
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
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignUpPage;
