import { Link } from "react-router-dom";

export default function UpcomingAppointments() {
  const appointments = [
    { id: "A001", patientName: "Michael Wilson", time: "09:00 AM", type: "Consultation", status: "Confirmed" },
    { id: "A002", patientName: "Sarah Brown", time: "10:30 AM", type: "Follow-up", status: "Pending" },
    { id: "A003", patientName: "David Lee", time: "02:00 PM", type: "Surgery", status: "Confirmed" },
    { id: "A004", patientName: "Jennifer Davis", time: "03:30 PM", type: "Check-up", status: "Confirmed" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 w-full max-w-md">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Today's Appointments
        </h2>
        <Link
          to="/appointments"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 text-sm font-medium"
        >
          View All
        </Link>
      </div>

      {/* Appointment List */}
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {appointment.patientName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.type}</p>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {appointment.time}
            </p>
          </div>
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
              appointment.status
            )}`}
          >
            {appointment.status}
          </span>
        </div>
      ))}
    </div>
  );
}
