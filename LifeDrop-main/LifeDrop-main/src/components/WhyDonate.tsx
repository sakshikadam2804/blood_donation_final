// src/components/WhyDonate.tsx
import React from 'react';
import { HeartHandshake, Activity, Users, Droplet } from 'lucide-react';

const reasons = [
  {
    icon: <HeartHandshake className="w-8 h-8 text-red-600" />,
    title: 'Save Lives',
    description: 'Your donation can help save up to three lives and make a huge difference for families in need.'
  },
  {
    icon: <Activity className="w-8 h-8 text-red-600" />,
    title: 'Improve Health',
    description: 'Regular blood donation may improve cardiovascular health and stimulate new blood cell production.'
  },
  {
    icon: <Users className="w-8 h-8 text-red-600" />,
    title: 'Community Impact',
    description: 'Donating blood helps ensure a stable blood supply for emergencies, surgeries, and cancer treatments.'
  },
  {
    icon: <Droplet className="w-8 h-8 text-red-600" />,
    title: 'Quick & Easy',
    description: 'The donation process is simple, safe, and takes less than an hour — yet it means the world to someone else.'
  }
];

const WhyDonate: React.FC = () => {
  return (
    <section className="py-20 bg-white text-center" id="why-donate">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Donate Blood?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Blood donation is a selfless act that saves lives every single day. Here’s why you should become a donor:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow">
              <div className="mb-4 flex justify-center">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-gray-600 text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDonate;
