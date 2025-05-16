import React from 'react';
import { bloodTypes } from '../data';

const BloodTypes: React.FC = () => {
  return (
    <section id="blood-types" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Understanding Blood Types
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Knowing your blood type is important for donations. Each type has unique characteristics 
            and compatibility with other types.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloodTypes.map((bloodType) => (
            <div 
              key={bloodType.type}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl font-bold text-red-600 mb-4">
                {bloodType.type}
              </div>
              <p className="text-gray-600 mb-4">
                {bloodType.description}
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Can Donate To:</h4>
                  <div className="flex flex-wrap gap-2">
                    {bloodType.canDonateTo.map((type) => (
                      <span 
                        key={type}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Can Receive From:</h4>
                  <div className="flex flex-wrap gap-2">
                    {bloodType.canReceiveFrom.map((type) => (
                      <span 
                        key={type}
                        className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BloodTypes;