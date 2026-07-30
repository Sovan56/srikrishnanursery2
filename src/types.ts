export type ProductCategory = 'Indoor' | 'Outdoor' | 'Fruit Plants' | 'Garden Supplies';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  priceRange: string;
  image: string;
  featured?: boolean;
  inStock?: boolean;
}

export interface BusinessInfo {
  name: string;
  kannadaName: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  address: string;
  landmark: string;
  area: string;
  city: string;
  pincode: string;
  plusCode: string;
  phone: string;
  whatsappPhone: string;
  email: string;
  hours: string;
  mapsEmbedUrl: string;
  mapsDirectionsUrl: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  tag?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  interest: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export type AppRoute = 
  | 'home' 
  | 'products' 
  | 'about' 
  | 'gallery' 
  | 'contact' 
  | 'admin-login' 
  | 'admin-dashboard';
