import { useState } from 'react';

export function RegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    role: 'player',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Registered successfully! You can login now.');
      } else {
        alert(data.error?.message || 'Registration failed');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input name='name' placeholder='Name' onChange={handleChange} required />
      <br />
      <input
        type='email'
        name='email'
        placeholder='Email'
        onChange={handleChange}
        required
      />
      <br />
      <input
        type='password'
        name='password'
        placeholder='Password'
        onChange={handleChange}
        required
      />
      <br />
      <input
        type='number'
        name='age'
        placeholder='Age'
        onChange={handleChange}
        required
      />
      <br />
      <button type='submit'>Register</button>
    </form>
  );
}
