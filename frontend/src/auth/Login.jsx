import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', { email, password });
      alert('Login successful!');
      console.log(res.data); // token, user info etc.
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md space-y-4 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">Login</h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Welcome back! Log in to access your <span className="text-blue-700 font-semibold">healthcare dashboard</span>.
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
