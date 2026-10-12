import { useState } from "react";
import clinicData from "../clinicData";

function Appointment() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName: formData.name,
          phone: formData.phone,
          preferredDate: formData.date,
          preferredTime: formData.time,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Booking failed with status ${response.status}`);
      }

      setSuccessMessage(
        "Appointment request submitted successfully. Our clinic team will contact you shortly.",
      );

      setFormData({
        name: "",
        phone: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (error) {
      console.error("Appointment booking error:", error);

      setErrorMessage(
        "Unable to submit your appointment request. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="appointment-section" id="appointment">
      <div className="container appointment-container">
        <div className="appointment-content">
          <p className="section-label">BOOK AN APPOINTMENT</p>

          <h2>
            Take the first step towards
            <span> better healthcare.</span>
          </h2>

          <p>
            Request an appointment by filling out the form. Our clinic team can
            contact you to confirm the appointment.
          </p>

          <div className="appointment-info">
            <div>
              <strong>📞 Call Us</strong>
              <span>+91 98765 43210</span>
            </div>

            <div>
              <strong>💬 WhatsApp</strong>
              <span>Quick appointment enquiries</span>
            </div>

            <div>
              <strong>🕒 Clinic Hours</strong>
              <span>Mon - Sat | 9 AM - 1 PM & 5 PM - 8:30 PM</span>
            </div>
          </div>
        </div>

        <div className="appointment-form-container">
          <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your 10-digit phone number"
                pattern="[0-9]{10}"
                maxLength="10"
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Time</label>

              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a time
                </option>

                <option value="Morning">Morning</option>

                <option value="Evening">Evening</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Briefly describe your enquiry"
              ></textarea>
            </div>
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button
              type="submit"
              className="primary-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request Appointment"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Appointment;
