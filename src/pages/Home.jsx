import React from 'react';
import Header from '../components/Header';
import IntroSection from '../components/IntroSection';
import Carousel from '../components/Carousel';
import FeatureSection from '../components/FeatureSection';
import HowItWorks from '../components/HowItWorks';
import AboutSection from '../components/AboutSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import VideoDemo from '../components/VideoDemo';
import FaqSection from '../components/FaqSection';
import ScrollUp from '../components/ScrollUp';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Header />
      
      <IntroSection />

      <Carousel />

      <FeatureSection />

      <HowItWorks />

      <VideoDemo/>

      <AboutSection />

      <CallToAction />

      <FaqSection/>

      <Contact/>

      <Footer />
    </>
  );
};

export default Home;
