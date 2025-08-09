import React from "react";

export default function PatientList() {
  const patients = [
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      bloodType: 'O+',
      lastVisit: '2024-01-10',
      status: 'Active',
      condition: 'Hypertension',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      name: 'Mary Wilson',
      age: 32,
      gender: 'Female',
      phone: '+1 (555) 234-5678',
      email: 'mary.wilson@email.com',
      bloodType: 'A-',
      lastVisit: '2024-01-08',
      status: 'Active',
      condition: 'Diabetes',
      doctor: 'Dr. Michael Brown'
    },
    {
      id: 3,
      name: 'David Lee',
      age: 58,
      gender: 'Male',
      phone: '+1 (555) 345-6789',
      email: 'david.lee@email.com',
      bloodType: 'B+',
      lastVisit: '2024-01-12',
      status: 'Inactive',
      condition: 'Heart Disease',
      doctor: 'Dr. Emily Davis'
    },
    {
      id: 4,
      name: 'Sarah Connor',
      age: 28,
      gender: 'Female',
      phone: '+1 (555) 456-7890',
      email: 'sarah.connor@email.com',
      bloodType: 'AB+',
      lastVisit: '2024-01-05',
      status: 'Active',
      condition: 'Asthma',
      doctor: 'Dr. James Wilson'
    },
    {
      id: 5,
      name: 'Robert Johnson',
      age: 67,
      gender: 'Male',
      phone: '+1 (555) 567-8901',
      email: 'robert.johnson@email.com',
      bloodType: 'O-',
      lastVisit: '2023-12-28',
      status: 'Active',
      condition: 'Arthritis',
      doctor: 'Dr. Lisa Anderson'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      age: 41,
      gender: 'Female',
      phone: '+1 (555) 678-9012',
      email: 'lisa.anderson@email.com',
      bloodType: 'A+',
      lastVisit: '2024-01-14',
      status: 'Active',
      condition: 'Migraine',
      doctor: 'Dr. Sarah Johnson'
    }
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === 'Active'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-100 text-gray-700';
  };

  const getGenderIcon = (gender) => {
    return gender === 'Male' ? 'ri-men-line' : 'ri-women-line';
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Age/Gender</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Blood Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Visit</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Condition</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Doctor</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className={`${getGenderIcon(patient.gender)} text-blue-600 text-lg`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-600">
                        ID: {patient.id.toString().padStart(4, '0')}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="font-medium text-gray-900">{patient.age} years</p>
                  <p className="text-sm text-gray-600">{patient.gender}</p>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <i className="ri-phone-line text-gray-400"></i>
                      <span className="text-sm text-gray-600">{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-mail-line text-gray-400"></i>
                      <span className="text-sm text-gray-600">{patient.email}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-medium">
                    {patient.bloodType}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <p className="text-gray-900">{patient.lastVisit}</p>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                    {patient.condition}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <p className="text-gray-900">{patient.doctor}</p>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                      <i className="ri-eye-line"></i>
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200">
                      <i className="ri-calendar-check-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-user-search-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">No patients found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
