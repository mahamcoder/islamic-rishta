import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Searchdata from "../components/Searchdata";
import Profilecards from "../components/Profilecards";
import Work from "../components/Work";
import Reviews from "../components/Reviews";
import FaqSection from "../components/FaqSection";
import Calltoaction from "../components/Calltoaction";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Searchdata />
      <Profilecards />
      <Work />
      <Reviews />
      <FaqSection />
      <Calltoaction />
      <Footer />
    </div>
  );
};

export default Home;
