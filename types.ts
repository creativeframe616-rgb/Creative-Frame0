export type Language = 'en' | 'ar';

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}