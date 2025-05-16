import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section 
  id="home" 
  className="relative min-h-screen pt-20 flex items-center justify-center bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white overflow-hidden"
>

      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6823617/pexels-photo-6823617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] 
          bg-cover bg-center opacity-30"
        ></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="flex justify-center mb-8">
          <Heart className="w-16 h-16 text-red-500 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Your Blood Donation Can Save <br />
          <span className="text-red-400">Three Lives</span>
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-10 text-gray-200">
          Every drop counts. Join our community of life-savers and make a difference today. 
          One donation can save multiple lives.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a 
            href="#donate" 
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300 flex items-center"
          >
            Donate Now <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a 
            href="#learn" 
            className="border-2 border-white hover:bg-white hover:text-red-900 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <ArrowRight className="w-8 h-8 transform rotate-90" />
        </a>
      </div>
    </section>
  );
};

export default Hero;