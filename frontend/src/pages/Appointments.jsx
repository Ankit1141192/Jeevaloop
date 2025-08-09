import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    appointmentDate: "",
    doctor: "",
    reason: ""
  });
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isPatientOrNurse = user.role === "patient" || user.role === "nurse";
  const isDoctor = user.role === "doctor";

  const API_BASE = "https://jeevaloop.onrender.com/appointments";
  const USERS_BASE = "https://jeevaloop.onrender.com/users";

  // Fetch appointments
  const fetchAppointments = async () => {
    if (!token) return setAppointments([]);
    try {
      setLoading(true);
      const res = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data || []);
    } catch {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors for patient/nurse dropdown
  const fetchDoctors = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${USERS_BASE}?role=doctor`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoctors(res.data || []);
    } catch {
      setDoctors([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointments();
      if (isPatientOrNurse) fetchDoctors();
    }
    // eslint-disable-next-line
  }, [token]);

  // Create appointment
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.doctor || !formData.appointmentDate)
      return alert("Please select a doctor and date/time.");

    try {
      await axios.post(
        API_BASE,
        {
          patient: user._id,
          doctor: formData.doctor,
          appointmentDate: formData.appointmentDate,
          reason: formData.reason
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData({ appointmentDate: "", doctor: "", reason: "" });
      setShowForm(false);
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.msg || "Error creating appointment");
    }
  };

  // Update status
  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_BASE}/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating status");
    }
  };

  // Delete appointment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.msg || "Error deleting appointment");
    }
  };

  // Filter: for doctors, show only their appointments
  const filteredAppointments = isDoctor
    ? appointments.filter(appt => appt.doctor?._id === user._id)
    : appointments;

  // Map status to color classes
  const statusClass = (status) => {
    if (status === "confirmed") return "bg-blue-100 text-blue-700";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "completed") return "bg-green-100 text-green-700";
    return "bg-gray-200 text-gray-600";
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>

      {/* Book Appointment for Patients/Nurses */}
      {isPatientOrNurse && !showForm && (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowForm(true)}
        >
          Book Appointment
        </button>
      )}

      {isPatientOrNurse && showForm && (
        <form onSubmit={handleCreate}
          className="mb-6 border p-4 rounded shadow bg-white"
        >
          <h2 className="text-lg font-semibold mb-4">Book an Appointment</h2>
          <label className="block mb-3">
            Date &amp; Time:
            <input
              type="datetime-local"
              value={formData.appointmentDate}
              onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
              className="border p-2 w-full mt-1 rounded"
              required
            />
          </label>
          <label className="block mb-3">
            Doctor:
            <select
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className="border p-2 w-full mt-1 rounded"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.length === 0 ? (
                <option value="">No doctors found</option>
              ) : (
                doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name}
                  </option>
                ))
              )}
            </select>
          </label>
          <label className="block mb-3">
            Reason:
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="border p-2 w-full mt-1 rounded"
            ></textarea>
          </label>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Appointment List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <p className="text-gray-500">No appointments found.</p>
          ) : (
            filteredAppointments.map((appt) => (
              <div
                key={appt._id}
                className="border p-4 rounded shadow-sm bg-white flex justify-between items-start"
              >
                <div>
                  <p>
                    <strong>Date:</strong>{" "}
                    {appt.appointmentDate
                      ? new Date(appt.appointmentDate).toLocaleString()
                      : ""}
                  </p>
                  <p>
                    <strong>Doctor:</strong>{" "}
                    {appt.doctor?.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Patient:</strong>{" "}
                    {appt.patient?.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Patient Email:</strong>{" "}
                    {appt.patient?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Patient Age/Gender:</strong>{" "}
                    {appt.patient?.age ? `${appt.patient.age} yrs` : "N/A"} {appt.patient?.gender || ""}
                  </p>
                  {appt.reason && (
                    <p>
                      <strong>Reason:</strong> {appt.reason}
                    </p>
                  )}
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${statusClass(appt.status)}`}
                  >
                    {appt.status}
                  </span>
                </div>
                {/* Action buttons for doctor/admin */}
                <div className="flex gap-2 mt-2">
                  {isDoctor && appt.status === "pending" && (
                    <button
                      onClick={() => handleUpdateStatus(appt._id, "confirmed")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Approve
                    </button>
                  )}
                  {isDoctor && appt.status === "confirmed" && (
                    <button
                      onClick={() => handleUpdateStatus(appt._id, "completed")}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(appt._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
