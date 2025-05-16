export interface NavItem {
  label: string;
  href: string;
}

export interface BloodType {
  type: string;
  description: string;
  canDonateTo: string[];
  canReceiveFrom: string[];
}

export interface DonationCenter {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Testimonial {
  id: number;
  name: string;
  quote: string;
  image: string;
  donatedTimes: number;
}