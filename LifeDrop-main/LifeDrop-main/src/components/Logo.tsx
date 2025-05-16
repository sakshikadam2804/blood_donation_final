import React from 'react';
import { Aperture } from 'lucide-react';

interface LogoProps {
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ color = 'text-blue-600' }) => {
  return (
    <a href="#home" className="flex items-center space-x-2">
      <Aperture className={`${color} w-8 h-8`} />
      <span className={`${color} font-serif font-bold text-xl tracking-tight`}>
        Atelier
      </span>
    </a>
  );
};

export default Logo;