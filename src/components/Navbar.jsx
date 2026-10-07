import { useState } from "react";
import clinicData from "../clinicData";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="demo-badge">Demo Website</div>
      <div className="container navbar-container">
        <a href="#home" className="logo">
          <span className="logo-icon">+</span>

          <span>
            CareFirst
            <small>{clinicData.name}</small>
          </span>
        </a>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>

          <a href="#about" onClick={() => setMenuOpen(false)}>
            About Doctor
          </a>

          <a href="#services" onClick={() => setMenuOpen(false)}>
            Services
          </a>

          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>

        <a href="#appointment" className="nav-button">
          Book Appointment
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default Navbar;
