import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <Link href="/" className="text-3xl font-bold text-blue-400 mb-4 block font-['Pacifico']">
                  MediCare Plus
                </Link>
                <p className="text-gray-400 text-lg mb-6 max-w-md">
                  Empowering healthcare facilities with advanced digital solutions for better patient care, streamlined operations, and enhanced medical outcomes.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                    <i className="ri-facebook-fill text-white"></i>
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                    <i className="ri-twitter-fill text-white"></i>
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                    <i className="ri-linkedin-fill text-white"></i>
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                    <i className="ri-mail-fill text-white"></i>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Platform</h3>
                <ul className="space-y-3">
                  <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Dashboard</Link></li>
                  <li><Link href="/patients" className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Patient Records</Link></li>
                  <li><Link href="/appointments" className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Appointments</Link></li>
                  <li><Link href="/analytics" className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Analytics</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-3">
                  <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Help Center</Link></li>
                  <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Terms of Service</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Contact Support</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-400">
                © 2024 MediCare Plus. All rights reserved. HIPAA Compliant Healthcare Solutions.
              </p>
            </div>
          </div>
        </footer>
  )
}

export default Footer
