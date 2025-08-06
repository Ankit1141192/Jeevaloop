import React from 'react';
import { FaUserMd, FaFileMedical, FaHospitalAlt, FaTabletAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaUserMd size={32} className="text-blue-600" />,
    title: 'Doctor Management',
    description: 'Easily manage doctor schedules, availability, and appointments.',
  },
  {
    icon: <FaFileMedical size={32} className="text-blue-600" />,
    title: 'Digital Medical Records',
    description: 'Securely store and access patient history and health reports.',
  },
  {
    icon: <FaHospitalAlt size={32} className="text-blue-600" />,
    title: 'Room & Ward Allocation',
    description: 'Automate room and bed assignments for streamlined patient flow.',
  },
  {
    icon: <FaTabletAlt size={32} className="text-blue-600" />,
    title: 'Remote Patient Monitoring',
    description: 'Monitor patient vitals and alerts from anywhere, anytime.',
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
        <p className="text-lg text-gray-600 mb-12">
          Empower your hospital with smart, scalable, and secure solutions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
