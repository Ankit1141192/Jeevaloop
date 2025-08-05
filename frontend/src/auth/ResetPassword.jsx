import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import show from "../assets/show.svg";
import unshow from "../assets/disable.svg";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  // Separate visibility state for each input
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      await axios.post(`http://localhost:3000/reset-password/${token}`, { password });
      setMessage('Password reset successful, redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Invalid or expired token');
    }
  };

  // Toggle for first input
  const toggleVisibility1 = () => {
    // Just toggle first input visibility independently
    setShowPassword1(prev => !prev);

    // If second input is visible but first is going to be hidden, keep second input unchanged
    // Otherwise, no special logic here.
  };

  // Toggle for second input with extra logic:
  const toggleVisibility2 = () => {
    if (!showPassword1) {
      // If first input hidden, just toggle second input visibility
      setShowPassword2(prev => !prev);
    } else {
      // If first input is visible, make BOTH visible immediately
      setShowPassword1(true);
      setShowPassword2(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form onSubmit={handleReset} className="bg-white p-8 rounded-xl shadow-md space-y-4 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">Reset Password</h2>

        {/* New Password */}
        <div className="relative">
          <input
            type={showPassword1 ? 'text' : 'password'}
            placeholder="New Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span
            onClick={toggleVisibility1}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <img src={showPassword1 ? unshow : show} alt={showPassword1 ? "Hide password" : "Show password"} className="w-6 h-6" />
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showPassword2 ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span
            onClick={toggleVisibility2}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <img src={showPassword2 ? unshow : show} alt={showPassword2 ? "Hide password" : "Show password"} className="w-6 h-6" />
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200"
        >
          Reset Password
        </button>

        {message && <p className="text-center text-sm mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
