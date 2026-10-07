import { useState } from "react";
import clinicData from "../clinicData";

function Appointment() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = clinicData.contact.whatsapp;

    const whatsappMessage = `
Hello CareFirst Family Clinic,

I would like to request an appointment.

Name: ${formData.name}
Phone: ${formData.phone}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}

Message:
${formData.message}
`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, "_blank");
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

            <button type="submit" className="primary-button">
              Request Appointment via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Appointment;
