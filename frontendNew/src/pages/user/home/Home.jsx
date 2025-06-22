//Home.jsx (line of code( 1 - )) 
//src/pages/user/home/Home.jsx

import React from "react";

import HeroSection from "./HeroSection";
import LiveBhajans from "./LiveBhajans";
import HomeProducts from "./HomeProducts";
import ViewMoreBtn from "./ViewMoreBtn";
import PujaServices from "./PujaServices";
import BookingForm from "./BookingForm";
import Articles from "./Articles";
import BlogSection from "./BlogSection";
import VerifiedPanditJis from "./VerifiedPanditJis";
import Footer from "../../../components/common/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <HeroSection />
      <LiveBhajans />
      <HomeProducts />
      <ViewMoreBtn />
      <PujaServices />
      <BookingForm />
      <Articles />
      <BlogSection />
      <VerifiedPanditJis />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
