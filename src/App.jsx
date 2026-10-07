import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";
import AboutDoctor from "./components/AboutDoctor";
import Services from "./components/Services";
import Appointment from "./components/Appointment";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CallButton from "./components/CallButton";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <AboutDoctor />
      <Services />
      <Appointment />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
