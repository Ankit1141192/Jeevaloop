import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import show from "../assets/show.svg";
import unshow from "../assets/disable.svg";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'doctor',
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:3000/signup`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      alert('Signup successful!');
      navigate("/login");
      console.log('Response:', res.data);
    } catch (err) {
      console.error('Signup error:', err);
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">Create an Account</h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Join our <span className="text-blue-700 font-semibold">healthcare platform</span> to connect with doctors, nurses, and patients.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <img
                src={showPassword ? show : unshow}
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-6 h-6"
              />
            </span>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="admin">Administrator</option>
            <option value="patient">Patient</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
