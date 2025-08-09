import { Link } from "react-router-dom";

export default function RecentPatients() {
  const patients = [
    { id: "P001", name: "John Anderson", age: 45, condition: "Hypertension", lastVisit: "2024-01-15", status: "Stable", doctor: "Dr. Sarah Wilson" },
    { id: "P002", name: "Emma Johnson", age: 32, condition: "Diabetes Type 2", lastVisit: "2024-01-14", status: "Follow-up Required", doctor: "Dr. Michael Chen" },
    { id: "P003", name: "Robert Davis", age: 58, condition: "Cardiac Arrhythmia", lastVisit: "2024-01-13", status: "Critical", doctor: "Dr. Sarah Wilson" },
    { id: "P004", name: "Lisa Thompson", age: 28, condition: "Asthma", lastVisit: "2024-01-12", status: "Improving", doctor: "Dr. James Miller" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Stable": return "bg-green-100 text-green-800";
      case "Critical": return "bg-red-100 text-red-800";
      case "Follow-up Required": return "bg-yellow-100 text-yellow-800";
      case "Improving": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 w-full max-w-lx">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Patients
        </h2>
        <Link
          to="/patients"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 text-sm font-medium"
        >
          View All
        </Link>
      </div>

      {/* Patient List */}
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <i className="ri-user-line text-blue-600 dark:text-blue-300"></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {patient.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ID: {patient.id} • Age: {patient.age}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {patient.condition}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                patient.status
              )}`}
            >
              {patient.status}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Last visit: {patient.lastVisit}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
