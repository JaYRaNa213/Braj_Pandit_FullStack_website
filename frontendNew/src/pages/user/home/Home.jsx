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
import ThemeToggle from "../../../components/ThemeToggle"; // ✅ Add this

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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Banner with Scroll-to-Actions */}
      <HeroSection
        onBookPanditClick={scrollToBooking}
        onSeeServicesClick={scrollToServices}
      />

      {/* Live Bhajans Streaming Section */}
      <LiveBhajans />

      {/* Featured Religious Products */}
      <HomeProducts />

      {/* Puja Services List (Scroll target) */}
      <div ref={servicesRef}>
        <PujaServices />
      </div>

      {/* Booking Form (Scroll target) */}
      <div ref={bookingRef}>
        <BookingForm />
      </div>

      {/* Famous Mandir Carousel Section */}
      <FamousPlaces />

      {/* AI-powered Assistant */}
      <ChatBot />

      {/* Blogs - react-scroll Element */}
      <Element name="blogSection">
        <BlogSection />
      </Element>

      {/* Verified Pandit List */}
      <VerifiedPanditJis />

      {/* Footer */}
      {/* <Footer /> */}

      {/* ✅ Toggle Button Floating on Screen */}
      <ThemeToggle />
    </div>
  );
};

export default Home;
