import React, { useState, useEffect } from "react";

const PATIENTS_PER_PAGE = 3;

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const patients = [
    { id: 1, name: 'John Smith', age: 45, gender: 'Male', phone: '+1 (555) 123-4567', email: 'john.smith@email.com', bloodType: 'O+', lastVisit: '2024-01-10', status: 'Active', condition: 'Hypertension', doctor: 'Dr. Sarah Johnson' },
    { id: 2, name: 'Mary Wilson', age: 32, gender: 'Female', phone: '+1 (555) 234-5678', email: 'mary.wilson@email.com', bloodType: 'A-', lastVisit: '2024-01-08', status: 'Active', condition: 'Diabetes', doctor: 'Dr. Michael Brown' },
    { id: 3, name: 'David Lee', age: 58, gender: 'Male', phone: '+1 (555) 345-6789', email: 'david.lee@email.com', bloodType: 'B+', lastVisit: '2024-01-12', status: 'Inactive', condition: 'Heart Disease', doctor: 'Dr. Emily Davis' },
    { id: 4, name: 'Sarah Connor', age: 28, gender: 'Female', phone: '+1 (555) 456-7890', email: 'sarah.connor@email.com', bloodType: 'AB+', lastVisit: '2024-01-05', status: 'Active', condition: 'Asthma', doctor: 'Dr. James Wilson' },
    { id: 5, name: 'Robert Johnson', age: 67, gender: 'Male', phone: '+1 (555) 567-8901', email: 'robert.johnson@email.com', bloodType: 'O-', lastVisit: '2023-12-28', status: 'Active', condition: 'Arthritis', doctor: 'Dr. Lisa Anderson' },
    { id: 6, name: 'Lisa Anderson', age: 41, gender: 'Female', phone: '+1 (555) 678-9012', email: 'lisa.anderson@email.com', bloodType: 'A+', lastVisit: '2024-01-14', status: 'Active', condition: 'Migraine', doctor: 'Dr. Sarah Johnson' },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageCount = Math.ceil(filteredPatients.length / PATIENTS_PER_PAGE);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * PATIENTS_PER_PAGE,
    currentPage * PATIENTS_PER_PAGE
  );

  const getStatusColor = (status) =>
    status === 'Active'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-100 text-gray-700';

  const getGenderIcon = (gender) =>
    gender === 'Male' ? 'ri-men-line' : 'ri-women-line';

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > pageCount) return;
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-700">Patients</h2>
          <p className="text-sm text-gray-500">
            Manage patient records and information
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
          onClick={() => alert('Add Patient functionality goes here!')}
        >
          <i className="ri-user-add-line text-lg"></i>
          Add New Patient
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, condition, or doctor..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              {['Patient', 'Age/Gender', 'Contact', 'Blood Type', 'Last Visit', 'Condition', 'Doctor', 'Status', 'Actions'].map((heading) => (
                <th
                  key={heading}
                  className="text-left py-3 px-3 font-semibold text-gray-700 text-sm"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedPatients.map((patient) => (
              <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className={`${getGenderIcon(patient.gender)} text-blue-600 text-lg`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-xs text-gray-500">
                        ID: {patient.id.toString().padStart(4, '0')}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <p className="font-medium text-gray-900 text-sm">{patient.age} yrs</p>
                  <p className="text-xs text-gray-500">{patient.gender}</p>
                </td>
                <td className="py-3 px-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <i className="ri-phone-line text-gray-400"></i>
                    {patient.phone}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <i className="ri-mail-line text-gray-400"></i>
                    {patient.email}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                    {patient.bloodType}
                  </span>
                </td>
                <td className="py-3 px-3 text-sm text-gray-700">{patient.lastVisit}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                    {patient.condition}
                  </span>
                </td>
                <td className="py-3 px-3 text-sm text-gray-700">{patient.doctor}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <i className="ri-eye-line"></i>
                    </button>
                    <button className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button className="p-1.5 text-purple-600 hover:bg-purple-50 rounded">
                      <i className="ri-calendar-check-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPatients.length === 0 && (
          <div className="text-center py-10">
            <i className="ri-user-search-line text-5xl text-gray-300 mb-2"></i>
            <p className="text-gray-500">No patients found matching your search</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center items-center mt-5 gap-2">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-sm"
          >
            Prev
          </button>
          {[...Array(pageCount)].map((_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === pageCount}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Patients;
