import React, { useRef } from "react";
import { Element } from "react-scroll";

import HeroSection from "./HeroSection";
import LiveBhajans from "./LiveBhajans";
import HomeProducts from "./HomeProducts";
import ViewMoreBtn from "./ViewMoreBtn";
import PujaServices from "./PujaServices";
import BookingForm from "./BookingForm";
import FamousPlaces from "./FamousPlacesSection";
import BlogSection from "./BlogSection";
import VerifiedPanditJis from "./VerifiedPanditJis";
import ChatBot from "../../../components/ChatBot";
import Footer from "../../../components/common/Footer";
import ThemeToggle from "../../../components/ThemeToggle";

const Home = () => {
  const bookingRef = useRef(null);
  const servicesRef = useRef(null);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

      {/* Home Products */}
      <section className="py-16 bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4">
          <HomeProducts />
        </div>
      </section>

      {/* Puja Services */}
      <section ref={servicesRef} className="py-20 bg-gradient-to-r from-[#fffbe6] to-[#fff5cc] dark:from-[#1e1e1e] dark:to-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4">
          <PujaServices />
        </div>
      </section>

      {/* Booking */}
      <section ref={bookingRef} className="py-20 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4">
          <BookingForm />
        </div>
      </section>

      {/* Famous Places */}
      <section className="py-20 bg-[#f5f5f5] dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4">
          <FamousPlaces />
        </div>
      </section>

      {/* Blogs */}
      <Element name="blogSection" className="py-20 bg-white dark:bg-[#181818]">
        <div className="max-w-7xl mx-auto px-4">
          <BlogSection />
        </div>
      </Element>

      {/* Verified Pandits */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50 dark:from-[#1a1a1a] dark:to-[#2b2b2b]">
        <div className="max-w-7xl mx-auto px-4">
          <VerifiedPanditJis />
        </div>
      </section>

      {/* ChatBot + ThemeToggle */}
      <ChatBot />
      {/* <ThemeToggle /> */}

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
