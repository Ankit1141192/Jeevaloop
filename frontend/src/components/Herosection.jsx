import React from 'react';
import { Link } from 'react-router-dom'; // Add this if you're using react-router for navigation

const Herosection = () => {
  return (
    <section className="relative min-h-screen  overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20hospital%20interior%20with%20clean%20white%20corridors%2C%20natural%20lighting%2C%20medical%20equipment%2C%20and%20healthcare%20professionals%20in%20a%20professional%20medical%20environment%20with%20blue%20and%20white%20color%20scheme&width=1920&height=1080&seq=hospital-hero-001&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Advanced Hospital
              <span className="text-blue-600 block">Management System</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Streamline patient care, manage medical records, and enhance healthcare delivery with our comprehensive digital solution designed for modern healthcare facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap">
                  Access Dashboard
                </button>
              </Link>
              <Link to="/request-demo">
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors duration-200 cursor-pointer whitespace-nowrap">
                  Request Demo
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="https://cdn.pixabay.com/photo/2016/11/08/05/29/surgery-1807541_1280.jpg"
              alt="Healthcare professionals using technology"
              className="rounded-2xl shadow-2xl object-cover w-full h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
