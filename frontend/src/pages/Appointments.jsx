import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    appointmentDate: "",
    doctor: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // AUTH DATA
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Only patient or nurse can book
  const allowedToBook = user.role === "patient" || user.role === "nurse";

  const API_BASE = "https://jeevaloop.onrender.com/appointments";
  const USERS_BASE = "https://jeevaloop.onrender.com/users";

  // --- Fetch all appointments the user is allowed to see ---
  const fetchAppointments = async () => {
    if (!token) {
      setAppointments([]);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data || []);
    } catch (err) {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch all doctors for dropdown (for booking) ---
  const fetchDoctors = async () => {
    if (!token) {
      setDoctors([]);
      return;
    }
    try {
      const res = await axios.get(
        `${USERS_BASE}?role=doctor`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDoctors(res.data || []);
    } catch (err) {
      setDoctors([]);
    }
  };

  // --- Run fetches on mount or login/role change ---
  useEffect(() => {
    if (token) {
      fetchAppointments();
      if (allowedToBook) fetchDoctors();
    } else {
      setAppointments([]);
      setDoctors([]);
    }
    // eslint-disable-next-line
  }, [token, allowedToBook]);

  // --- Create appointment ---
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in.");
    if (!formData.doctor || !formData.appointmentDate)
      return alert("Please select a doctor and date/time.");
    try {
      await axios.post(
        API_BASE,
        {
          patient: user._id,
          doctor: formData.doctor,
          appointmentDate: formData.appointmentDate,
          reason: formData.reason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData({ appointmentDate: "", doctor: "", reason: "" });
      setShowForm(false);
      fetchAppointments();
    } catch (err) {
      alert(
        err.response?.data?.msg ||
        err.response?.data?.error ||
        "Error creating appointment"
      );
    }
  };

  // --- Update appointment status ---
  const handleUpdateStatus = async (id, status) => {
    if (!token) return alert("You must be logged in.");
    try {
      await axios.put(
        `${API_BASE}/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAppointments();
    } catch (err) {
      alert(
        err.response?.data?.msg ||
        err.response?.data?.error ||
        "Error updating status"
      );
    }
  };

  // --- Delete appointment ---
  const handleDelete = async (id) => {
    if (!token) return alert("You must be logged in.");
    try {
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAppointments();
    } catch (err) {
      alert(
        err.response?.data?.msg ||
        err.response?.data?.error ||
        "Error deleting appointment"
      );
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>

      {/* Book Appointment Button (ONLY patient & nurse) */}
      {allowedToBook && !showForm && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowForm(true)}
        >
          Book Appointment
        </button>
      )}

      {/* Appointment Form (ONLY patient & nurse: select doctor) */}
      {allowedToBook && showForm && (
        <form onSubmit={handleCreate} className="mb-6 border p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Book an Appointment</h2>
          <label className="block mb-2">
            Date &amp; Time:
            <input
              type="datetime-local"
              value={formData.appointmentDate}
              onChange={(e) =>
                setFormData({ ...formData, appointmentDate: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Doctor:
            <select
              value={formData.doctor}
              onChange={(e) =>
                setFormData({ ...formData, doctor: e.target.value })
              }
              className="border p-2 w-full"
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
          <label className="block mb-2">
            Reason:
            <textarea
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              className="border p-2 w-full"
            ></textarea>
          </label>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
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

      {/* Appointment List (visible for ALL users) */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            appointments.map((appt) => (
              <li
                key={appt._id}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Date:</strong>{" "}
                    {appt.appointmentDate
                      ? new Date(appt.appointmentDate).toLocaleString()
                      : ""}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {appt.doctor?.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Patient:</strong> {appt.patient?.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Status:</strong> {appt.status}
                  </p>
                  {appt.reason && (
                    <p>
                      <strong>Reason:</strong> {appt.reason}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(appt._id, "completed")}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleDelete(appt._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
