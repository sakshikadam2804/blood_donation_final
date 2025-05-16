// src/components/DonationCenters.tsx
import React from 'react';

const centers = [
  {
    name: 'Central Blood Bank',
    address: '123 Main Street, Downtown',
    phone: '(555) 123-4567',
    hours: 'Mon-Sat: 8:00 AM - 8:00 PM'
  },
  {
    name: 'Community Blood Center',
    address: '456 Park Avenue, Midtown',
    phone: '(555) 987-6543',
    hours: 'Mon-Sun: 9:00 AM - 6:00 PM'
  },
  {
    name: 'Regional Blood Hub',
    address: '789 West Street, Uptown',
    phone: '(555) 456-7890',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM'
  }
];

const DonationCenters: React.FC = () => {
  return (
    <section id="centers" className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Donation Centers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {centers.map(center => (
            <div key={center.name} className="border rounded shadow p-4 text-left">
              <h3 className="text-xl font-semibold text-red-600 mb-1">{center.name}</h3>
              <p className="text-sm text-gray-700">{center.address}</p>
              <p className="text-sm text-gray-600 mt-1">{center.phone}</p>
              <p className="text-sm text-gray-500">{center.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationCenters;
