import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import WhyDonate from '../components/WhyDonate';

import BloodTypes from '../components/BloodTypes';
import DonationCenters from '../components/DonationCenters';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer'; // ✅ Make sure this is here

const HomePage: React.FC = () => {
  return (
    <main className="bg-white text-gray-900">
      <Hero />
      <About />
      <WhyDonate />
      <BloodTypes />
      <DonationCenters />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default HomePage;
