import clinicData from "../clinicData";
function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-heading">
          <p className="section-label">CONTACT & LOCATION</p>

          <h2>
            We're here when you
            <span> need us.</span>
          </h2>

          <p>
            Get in touch with the clinic or find us easily using the location
            details below.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">📍</div>

            <h3>Clinic Location</h3>

            <p>
              {clinicData.location.address}
              <br />
            </p>

            <a
              href={clinicData.location.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              Get Directions →
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📞</div>

            <h3>Call Us</h3>

            <p>Speak with the clinic team for appointment enquiries.</p>

            <a
              href={`tel:${clinicData.contact.phone}`}
              className="contact-link"
            >
              {clinicData.contact.phone}
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">💬</div>

            <h3>WhatsApp</h3>

            <p>Send us a message for appointment and general enquiries.</p>

            <a
              href={`https://wa.me/${clinicData.contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              Chat on WhatsApp →
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">✉️</div>

            <h3>Email Us</h3>

            <p>
              Send us an email for general enquiries and appointment
              information.
            </p>

            <a
              href={`mailto:${clinicData.contact.email}`}
              className="contact-link"
            >
              {clinicData.contact.email}
            </a>
          </div>
        </div>

        <div className="clinic-hours">
          <div>
            <strong>Clinic Hours</strong>
          </div>

          <div>
            <span>{clinicData.timings.weekdays}</span>
            <span>{clinicData.timings.morning}</span>
            <span>{clinicData.timings.evening}</span>
          </div>

          <div>
            <span>Sunday</span>
            <span>{clinicData.timings.sunday}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
