// src/components/About.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">About LifeDrop</h2>
        <p className="text-gray-600 text-lg">
          LifeDrop is committed to connecting blood donors with patients in need. Our mission is to simplify the process, encourage regular donations, and ensure that no one suffers due to blood shortages.
        </p>
      </div>
    </section>
  );
};

export default About;
