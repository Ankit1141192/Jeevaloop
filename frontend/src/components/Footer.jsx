import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom or your routing library

const Footer = () => {
  return (
    <footer className="  py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-3xl font-bold text-blue-400 mb-4 block font-['Pacifico']"
            >
              Jeevaloop
            </Link>
            <p className="text-gray-400 text-lg mb-6 max-w-md">
              Empowering healthcare facilities with advanced digital solutions
              for better patient care, streamlined operations, and enhanced
              medical outcomes.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  icon: 'linkedin',
                  href: 'https://www.linkedin.com/in/ankit1141/',
                  color: 'text-blue-700 hover:text-blue-800',
                },
                {
                  icon: 'github',
                  href: 'https://github.com/Ankit1141192',
                  color: 'text-gray-800 hover:text-gray-900 dark:text-white dark:hover:text-gray-300',
                },
                {
                  icon: 'twitter',
                  href: 'https://x.com/ankitk09773',
                  color: 'text-blue-500 hover:text-blue-600',
                },
                {
                  icon: 'instagram',
                  href: 'https://www.instagram.com/mr__unique_ankitkumar4954/',
                  color: 'text-pink-600 hover:text-pink-700',
                },
                {
                  icon: 'mail',
                  href: 'mailto:jeevaloop@gmail.com',
                  color: 'text-red-500 hover:text-red-600',
                },
              ].map(social => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer ${social.color}`}
                // no bg color class here, just text colors
                >
                  <i
                    className={`ri-${social.icon}-${social.icon === 'github' ? 'fill' : 'line'} text-xl`}
                    aria-hidden="true"
                  ></i>
                </a>
              ))}
            </div>

          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-black transition-colors duration-200 cursor-pointer"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/patients"
                  className="text-gray-400 hover:text-black transition-colors duration-200 cursor-pointer"
                >
                  Patient Records
                </Link>
              </li>
              <li>
                <Link
                  to="/appointments"
                  className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/help-center"
                  className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-support"
                  className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-center text-sm mt-4">
            © 2025 Jeevaloop. All rights reserved. Developed with{' '}
            <span role="img" aria-label="heart" className="text-red-500">
              ❤️
            </span>{' '}
            by Ankit Kumar.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
