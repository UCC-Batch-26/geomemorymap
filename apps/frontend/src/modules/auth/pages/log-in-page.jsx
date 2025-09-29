import { useState } from 'react';
import { useNavigate } from 'react-router';

function LoginPage({ setToken, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to server');
    }
  };

  return (
    <div className='bg-[url(@/assets/geo-memory-map-bg.png)] bg-no-repeat bg-center'>
    <div className="grid grid-cols-4 grid-rows-auto h-200 bg-[#526b5c]/80">
      <h1 className="font-[Montserrat] text-7xl font-bold text-white text-left col-start-2 row-start-2 p-10">Login</h1>
      <h3 className="font-[Montserrat] text-2xl font-bold text-white text-left col-start-2 row-start-2 mt-30 ml-10">Sign in to continue</h3>
      <div className="flex items-center justify-center col-start-3 row-start-2">
        <form onSubmit={handleLogin} className="bg-white/50 p-6 rounded-xl shadow-md w-80 h-90">
          <h2 className="text-3xl font-bold text-white text-center mb-6 font-[Montserrat]">Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />

          <button
            type="submit"
            className="w-full bg-[#EF6B48] text-white py-2 rounded-md hover:bg-[#e9542b] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
