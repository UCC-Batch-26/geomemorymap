import { useNavigate } from 'react-router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const LOGIN_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;

function LoginPage({ setToken, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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
      if (error.response) {
        // Server responded with a status outside 2xx
        if (error.response.status === 401) {
          toast.error('Unauthorized – please log in again');
        } else if (error.response.status >= 500) {
          toast.error('Server error, please try later');
        } else {
          toast.error(error.response.data?.message || 'Something went wrong');
        }
      } else if (error.request) {
        // No response from server
        toast.error('No response from server. Check your internet.');
      } else {
        // Something else (like code bug)
        toast.error('Unexpected error occurred');
      }
      console.error(error);
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
    <div className="fixed bg-[url(@/assets/geo-memory-map-bg.png)] bg-size-[600px] bg-no-repeat bg-center ">
      <div className="grid grid-cols-4 bg-[#526b5c]/80 h-[100vh]">
        <div className="col-start-2 row-start-2">
          <h1 className="font-[Montserrat] text-7xl font-bold text-white text-left">Login</h1>
          <h3 className="font-[Montserrat] text-2xl font-bold text-white text-left py-5">Sign in to continue</h3>
          <h4 className="font-[Montserrat] text-md  text-white text-left py-20">
            Discover your world's stories—pin your memories, share your moments, and bring your map to life!
          </h4>
        </div>
        {/* FORM */}
        <div className="place-items-center col-start-3 row-start-2">
          <form onSubmit={handleLogin} className="bg-white/50 p-6 rounded-xl shadow-md w-80 h-90">
            <h2 className="text-3xl font-bold text-gray-100 text-shadow-2xs text-center mb-6 font-[Montserrat]">
              Login
            </h2>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 mb-4 border border-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mb-6 border border-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />

            <button
              type="submit"
              className="w-full bg-[#EF6B48] text-white py-2 rounded-md hover:bg-[#e9542b] transition"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="w-full bg-white/70 text-gray-700 py-2 rounded-md hover:bg-white transition mt-3"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
