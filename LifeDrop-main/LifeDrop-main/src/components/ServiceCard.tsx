import React from 'react';
import { 
  PencilRuler, 
  Code, 
  Palette, 
  Megaphone,
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const getIcon = () => {
    switch (service.icon) {
      case 'pencil-ruler':
        return <PencilRuler className="w-12 h-12 text-blue-600" />;
      case 'code':
        return <Code className="w-12 h-12 text-blue-600" />;
      case 'palette':
        return <Palette className="w-12 h-12 text-blue-600" />;
      case 'megaphone':
        return <Megaphone className="w-12 h-12 text-blue-600" />;
      default:
        return <PencilRuler className="w-12 h-12 text-blue-600" />;
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
      style={{ 
        animationDelay: `${index * 150}ms`,
        animation: 'fadeInUp 0.8s ease forwards',
        opacity: 0,
        transform: 'translateY(20px)'
      }}
    >
      <div className="mb-6">{getIcon()}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
      <p className="text-gray-600">{service.description}</p>
    </div>
  );
};

export default ServiceCard;