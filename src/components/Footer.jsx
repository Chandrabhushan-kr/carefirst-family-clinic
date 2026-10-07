import clinicData from "../clinicData";
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <a href="#home" className="logo">
            <span className="logo-icon">+</span>

            <span>
              CareFirst
              <small>{clinicData.name}</small>
            </span>
          </a>

          <p>
            Compassionate and reliable healthcare for individuals and families.
          </p>
          <p className="medical-disclaimer">
            This website provides general information about the clinic and its
            services. It is not a substitute for professional medical advice or
            emergency care.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#about">About Doctor</a>
          <a href="#services">Services</a>
          <a href="#appointment">Book Appointment</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <a href={`tel:${clinicData.contact.phone}`}>
            {clinicData.contact.phone}
          </a>

          <a
            href={`https://wa.me/${clinicData.contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Us
          </a>

          <p>{clinicData.location.address}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 CareFirst Family Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
