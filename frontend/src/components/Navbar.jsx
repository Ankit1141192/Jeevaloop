import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    console.log("Logout clicked");
    logout();
    setShowDropdown(false);
  };

  // Shared button class
  const buttonClass = "flex items-center justify-center gap-2 w-[120px] h-[40px] font-semibold rounded-full text-white bg-gradient-to-b from-[#d6cafe] to-[#9e81fe] shadow-[1px_3px_0px_#8b71ff] active:translate-x-[2px] active:shadow-[0px_1px_0px_#8b71ff] transition duration-300";

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      <Link to="/" className="text-2xl font-bold text-blue-600 ml-20 font-['Pacifico']">
        Jeevaloop
      </Link>

      <div className="hidden md:flex space-x-8">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/appointments" className="text-gray-700 hover:text-blue-600">Appointments</Link>
        <Link to="/patients" className="text-gray-700 hover:text-blue-600">Patients</Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
      </div>

      <div className="flex space-x-4 mr-10">
        {!user ? (
          <>
            <Link to="/login">
              <button className={buttonClass}>Login</button>
            </Link>
            <Link to="/register">
              <button className={buttonClass}>Register</button>
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setShowDropdown(prev => !prev)}
            >
              <img
                src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>
            {showDropdown && (
              <div
                className="absolute right-0 mt-2 bg-white border rounded shadow-md w-40 z-10"
                onMouseLeave={() => setShowDropdown(false)}
              >
                <span className="block px-4 py-2 text-gray-700 break-words">{user.name}</span>
                <span className="block px-4 py-2 text-gray-700 break-words">{user.role}</span>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
