import clinicData from "../clinicData";
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-container">
        <div className="hero-content">
          <p className="hero-label">FAMILY PHYSICIAN • GENERAL CONSULTATION</p>

          <h1>
            Your Family's Health,
            <span> Our Priority.</span>
          </h1>

          <p className="hero-description">
            Compassionate and reliable healthcare for you and your family. Get
            personalized medical consultation from an experienced family
            physician.
          </p>

          <div className="hero-buttons">
            <a href="#appointment" className="primary-button">
              Book an Appointment
            </a>

            <a
              href={`https://wa.me/${clinicData.contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="secondary-button"
            >
              WhatsApp Us
            </a>
          </div>

          <div className="hero-info">
            <div>
              <strong>{clinicData.doctor.experience}</strong>
              <span>Years Experience</span>
            </div>

            <div>
              <strong>Family Care</strong>
              <span>Personalized Attention</span>
            </div>

            <div>
              <strong>Mon - Sat</strong>
              <span>9 AM - 8:30 PM</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-card">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
              alt="Doctor"
            />

            <div className="doctor-card">
              <strong>{clinicData.doctor.name}</strong>
              <span>
                {clinicData.doctor.qualification} •{" "}
                {clinicData.doctor.specialty}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
