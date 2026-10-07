import clinicData from "../clinicData";

function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-heading">
          <p className="section-label">OUR SERVICES</p>

          <h2>
            Healthcare for your
            <span> everyday needs.</span>
          </h2>

          <p>
            We provide general healthcare consultation and personalized medical
            guidance for individuals and families.
          </p>
        </div>

        <div className="services-grid">
          {clinicData.services.map((service, index) => (
            <div className="service-card" key={service}>
              <div className="service-icon">
                {["🩺", "❤️", "🌡️", "📋"][index]}
              </div>

              <h3>{service}</h3>

              <p>
                Professional and personalized healthcare support based on your
                individual needs.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
