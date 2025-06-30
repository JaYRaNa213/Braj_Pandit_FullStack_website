// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

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
    <div className="min-h-screen bg-white text-gray-900">
      <HeroSection
        onBookPanditClick={scrollToBooking}
        onSeeServicesClick={scrollToServices}
      />
      <LiveBhajans />
      <HomeProducts />

      <div ref={servicesRef}>
        <PujaServices />
      </div>

      <div ref={bookingRef}>
        <BookingForm />
      </div>

      <FamousPlaces />
      <ChatBot />

      {/* ✅ This makes react-scroll work */}
      <Element name="blogSection">
        <BlogSection />
      </Element>

      <VerifiedPanditJis />
    </div>
  );
};

export default Home;