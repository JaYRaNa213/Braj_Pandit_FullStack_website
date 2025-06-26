import React, { useRef } from "react";

import HeroSection from "./HeroSection";
import LiveBhajans from "./LiveBhajans";
import HomeProducts from "./HomeProducts";
import ViewMoreBtn from "./ViewMoreBtn";
import PujaServices from "./PujaServices";
import BookingForm from "./BookingForm";
import FamousPlaces from "./FamousPlacesSection";
import BlogSection from "./BlogSection";
import VerifiedPanditJis from "./VerifiedPanditJis";
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

      <BlogSection />

      <VerifiedPanditJis />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
