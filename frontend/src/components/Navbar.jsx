import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-500 p-4 flex justify-between items-center">
        <div className="container mx-auto">
          <h1 className="text-white text-2xl font-bold">Jeevaloop</h1>
        </div>
        <div className="flex space-x-4 mr-4">
          <Link to="/login">
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600">
              Register
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
