import clinicData from "../clinicData";
function AboutDoctor() {
  return (
    <section className="about-section" id="about">
      <div className="container about-container">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80"
            alt="Dr. Ananya Sharma"
          />
        </div>

        <div className="about-content">
          <p className="section-label">ABOUT THE DOCTOR</p>

          <h2>
            Caring for your health with
            <span> experience and compassion.</span>
          </h2>

          <p>
            {clinicData.doctor.name} is a family physician focused on providing
            personalized healthcare for individuals and families.
          </p>

          <p>
            With experience in general medicine and family care, the focus is on
            understanding each patient's concerns and providing appropriate
            medical guidance.
          </p>

          <div className="doctor-details">
            <div>
              <strong>{clinicData.doctor.experience}</strong>
              <span>Years Experience</span>
            </div>

            <div>
              <strong>{clinicData.doctor.qualification}</strong>
              <span>Medical Qualification</span>
            </div>

            <div>
              <strong>Family Care</strong>
              <span>Primary Focus</span>
            </div>
          </div>

          <a href="#appointment" className="primary-button">
            Book an Appointment
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutDoctor;
