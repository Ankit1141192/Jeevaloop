import React, { useState } from 'react';
import axios from 'axios';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/forgot-password`, { email });
      setMessage('If your email is registered, you will receive a reset link shortly.');
    } catch (err) {
      setMessage('Error sending reset link.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-4 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-6">Enter your email to receive a password reset link.</p>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200"
        >
          Send Reset Link
        </button>
        {message && <p className="text-center text-sm mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
