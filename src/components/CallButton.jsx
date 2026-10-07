import clinicData from "../clinicData";

function CallButton() {
  return (
    <a
      href={`tel:${clinicData.contact.phone}`}
      className="call-button"
      aria-label="Call the clinic"
    >
      <span>📞</span>
      <span>Call Us</span>
    </a>
  );
}

export default CallButton;
