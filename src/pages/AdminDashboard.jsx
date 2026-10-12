import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const fetchAppointments = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      }
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();

      setAppointments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_BASE_URL}/api/appointments/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: status,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedAppointment = await response.json();

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment.id === updatedAppointment.id
            ? updatedAppointment
            : appointment,
        ),
      );
    } catch (error) {
      console.error(error);

      alert("Failed to update appointment status.");
    }
  };

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }

      setAppointments((currentAppointments) =>
        currentAppointments.filter((appointment) => appointment.id !== id),
      );
    } catch (error) {
      console.error(error);

      alert("Failed to delete appointment.");
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      (appointment.patientName || "").toLowerCase().includes(search) ||
      (appointment.phone || "").toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "ALL" || appointment.status === statusFilter;

    const matchesDate = !dateFilter || appointment.preferredDate === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const todaysAppointments = appointments.filter(
    (appointment) => appointment.preferredDate === todayString,
  ).length;

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.preferredDate > todayString &&
      appointment.status !== "CANCELLED" &&
      appointment.status !== "COMPLETED",
  ).length;

  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "PENDING",
  ).length;

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "CONFIRMED",
  ).length;

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "CANCELLED",
  ).length;

  if (loading) {
    return <div className="admin-loading">Loading appointments...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const statusChartData = [
    {
      name: "Pending",
      value: appointments.filter((a) => a.status === "PENDING").length,
    },
    {
      name: "Confirmed",
      value: appointments.filter((a) => a.status === "CONFIRMED").length,
    },
    {
      name: "Cancelled",
      value: appointments.filter((a) => a.status === "CANCELLED").length,
    },
    {
      name: "Completed",
      value: appointments.filter((a) => a.status === "COMPLETED").length,
    },
  ];

  const statusColors = ["#f59e0b", "#0d9488", "#ef4444", "#64748b"];

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>CareFirst Admin</h1>
          <p>Appointment Management</p>
        </div>

        <button type="button" className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="admin-container">
        <section className="admin-stats">
          <div className="stat-card">
            <h3>Total</h3>

            <p>{totalAppointments}</p>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>

            <p>{pendingAppointments}</p>
          </div>

          <div className="stat-card">
            <h3>Confirmed</h3>

            <p>{confirmedAppointments}</p>
          </div>

          <div className="stat-card">
            <h3>Cancelled</h3>

            <p>{cancelledAppointments}</p>
          </div>

          <div className="stat-card">
            <h3>Today's Appointments</h3>
            <p>{todaysAppointments}</p>
          </div>

          <div className="stat-card">
            <h3>Upcoming Appointments</h3>
            <p>{upcomingAppointments}</p>
          </div>
        </section>

        <section className="analytics-section">
          <h2>Appointment Status Overview</h2>

          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={entry.name} fill={statusColors[index]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="appointments-section">
          <div className="section-header">
            <div>
              <h2>Appointments</h2>
              <p>Manage patient appointment requests</p>
            </div>

            <button
              type="button"
              className="refresh-button"
              onClick={() => fetchAppointments(true)}
              disabled={refreshing}
            >
              <span
                className={
                  refreshing ? "refresh-icon spinning" : "refresh-icon"
                }
              >
                ↻
              </span>
              <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>

          <div className="appointment-filters">
            <input
              type="text"
              placeholder="Search patient name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search patient name or phone"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by appointment status"
            >
              <option value="ALL">All statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              aria-label="Filter by appointment date"
            />

            <button
              type="button"
              className="clear-filters-button"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("ALL");
                setDateFilter("");
              }}
            >
              Clear filters
            </button>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <h3>No matching appointments</h3>
              <p>Try changing your search or filters.</p>
            </div>
          ) : (
            <div className="appointments-table-wrapper">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Patient</th>

                    <th>Phone</th>

                    <th>Date</th>

                    <th>Time</th>

                    <th>Message</th>

                    <th>Status</th>

                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>
                        <strong>{appointment.patientName}</strong>
                      </td>

                      <td>{appointment.phone}</td>

                      <td>{appointment.preferredDate}</td>

                      <td>{appointment.preferredTime}</td>

                      <td>{appointment.message || "-"}</td>

                      <td>
                        <select
                          value={appointment.status}
                          onChange={(e) =>
                            updateStatus(appointment.id, e.target.value)
                          }
                        >
                          <option value="PENDING">Pending</option>

                          <option value="CONFIRMED">Confirmed</option>

                          <option value="CANCELLED">Cancelled</option>

                          <option value="COMPLETED">Completed</option>
                        </select>
                      </td>

                      <td>
                        <div className="appointment-actions">
                          <button
                            type="button"
                            className="view-details-button"
                            onClick={() => setSelectedAppointment(appointment)}
                          >
                            View Details
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() => deleteAppointment(appointment.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
        {selectedAppointment && (
          <div
            className="appointment-modal-overlay"
            onClick={() => setSelectedAppointment(null)}
          >
            <div
              className="appointment-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="appointment-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="appointment-modal-header">
                <h2 id="appointment-modal-title">Appointment Details</h2>

                <button
                  type="button"
                  className="modal-close-button"
                  onClick={() => setSelectedAppointment(null)}
                  aria-label="Close appointment details"
                >
                  &times;
                </button>
              </div>

              <div className="appointment-details">
                <p>
                  <strong>Patient:</strong>{" "}
                  {selectedAppointment.patientName || "-"}
                </p>

                <p>
                  <strong>Phone:</strong> {selectedAppointment.phone || "-"}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {selectedAppointment.preferredDate || "-"}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {selectedAppointment.preferredTime || "-"}
                </p>

                <p>
                  <strong>Status:</strong> {selectedAppointment.status || "-"}
                </p>

                <div className="appointment-message">
                  <strong>Message:</strong>
                  <p>{selectedAppointment.message || "No message provided."}</p>
                </div>
              </div>

              <div className="appointment-modal-footer">
                <button
                  type="button"
                  className="view-details-button"
                  onClick={() => setSelectedAppointment(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
