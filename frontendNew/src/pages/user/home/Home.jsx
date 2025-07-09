import React, { useRef, useEffect } from "react";
import { Element, scroller } from "react-scroll";
import { useLocation } from "react-router-dom";

import HeroSection from "./HeroSection";
import LiveBhajans from "./LiveBhajans";
import HomeProducts from "./HomeProducts";
import PujaServices from "./PujaServices";
import VerifiedPanditJis from "./VerifiedPanditJis";
import ChatBot from "../../../components/ChatBot";

const Home = () => {
  const bookingRef = useRef(null);
  const servicesRef = useRef(null);
  const location = useLocation();

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Scroll to section if coming from Navbar
  useEffect(() => {
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        duration: 1000,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -80,
      });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero */}
      <HeroSection
        onBookPanditClick={scrollToBooking}
        onSeeServicesClick={scrollToServices}
      />

      {/* Live Bhajans */}
      <section className="py-16 bg-gradient-to-b from-white to-orange-50 dark:from-[#1a1a1a] dark:to-[#2b2b2b]">
        <div className="max-w-7xl mx-auto px-4">
          <LiveBhajans />
        </div>
      </section>

      {/* ✅ Home Products with Element name="products" */}
      <Element name="products">
        <section className="py-16 bg-white dark:bg-[#121212]">
          <div className="max-w-7xl mx-auto px-4">
            <HomeProducts />
          </div>
        </section>
      </Element>

      {/* ✅ Puja Services */}
      <section
        ref={servicesRef}
        className="py-20 bg-gradient-to-r from-[#fffbe6] to-[#fff5cc] dark:from-[#1e1e1e] dark:to-[#2a2a2a]"
      >
        <div className="max-w-7xl mx-auto px-4">
          <PujaServices />
        </div>
      </section>

      {/* ✅ Verified Pandits with Element name="verifiedPandits" */}
      <Element name="verifiedPandits">
        <section
          ref={bookingRef}
          className="py-20 bg-gradient-to-b from-white to-orange-50 dark:from-[#1a1a1a] dark:to-[#2b2b2b]"
        >
          <div className="max-w-7xl mx-auto px-4">
            <VerifiedPanditJis />
          </div>
        </section>
      </Element>

      <ChatBot />
    </div>
  );
};

export default Home;
