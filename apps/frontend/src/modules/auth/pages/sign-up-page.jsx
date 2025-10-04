import { useState } from 'react';

const SIGN_UP_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`;

function SignUpPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
  });

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

    try {
      const res = await fetch(SIGN_UP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, age }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert('Registered successfully! You can login now.');
        setForm({ username: '', email: '', password: '', age: '' });
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white border border-black rounded-lg p-6 w-80 shadow-md" onSubmit={handleRegister}>
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
