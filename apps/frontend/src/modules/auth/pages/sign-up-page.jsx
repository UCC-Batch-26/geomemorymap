import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function SignUpPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
  });

  const navigate = useNavigate();

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

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, age }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Registered successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
        setForm({ username: '', email: '', password: '', age: '' });
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Error connecting to server');
    }
  };

  return (
    <div className="fixed bg-[url(@/assets/geo-memory-map-bg.png)] bg-size-[600px] bg-no-repeat bg-center">
      <div className="grid grid-cols-4 bg-[#526b5c]/80 h-[100vh]">
        {/* LEFT SECTION */}
        <div className="col-start-2 row-start-2">
          <h1 className="font-[Montserrat] text-6xl font-bold text-white text-left">Sign Up</h1>
          <h3 className="font-[Montserrat] text-2xl font-bold text-white text-left py-5">Create your account</h3>
          <h4 className="font-[Montserrat] text-md text-white text-left py-20">
            Join the map of memories — explore, connect, and share your own world’s stories!
          </h4>
        </div>

        {/* RIGHT SECTION (FORM) */}
        <div className="place-items-center col-start-3 row-start-2">
          <form onSubmit={handleRegister} className="bg-white/50 p-6 rounded-xl shadow-md w-80 h-100">
            <h2 className="text-3xl font-bold text-gray-100 text-shadow-2xs text-center mb-6 font-[Montserrat]">
              Sign Up
            </h2>

            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full p-2 mb-4 border border-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 mb-4 border border-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-2 mb-4 border border-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              required
              className="w-full p-2 mb-6 border border-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />

            <button
              type="submit"
              className="w-full bg-[#EF6B48] text-white py-2 mb-8 rounded-md hover:bg-[#e9542b] transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
