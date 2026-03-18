import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";

// ✅ TypeScript fix for Crisp
declare global {
  interface Window {
    $crisp: any;
    CRISP_WEBSITE_ID: string;
  }
}

function App() {

  // 🔥 Crisp Chat Integration (FINAL FIX)
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "c5760796-3602-462e-9887-b4bfef3b987f";

    // 🔥 Reset old session (VERY IMPORTANT)
    window.$crisp.push(["do", "session:reset"]);

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;

    document.head.appendChild(script);
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>

        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;