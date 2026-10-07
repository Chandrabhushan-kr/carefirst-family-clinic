import clinicData from "../clinicData";

function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${clinicData.contact.whatsapp}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-button"
      aria-label="Chat with us on WhatsApp"
    >
      <span>💬</span>
      <span>WhatsApp Us</span>
    </a>
  );
}

export default WhatsAppButton;
