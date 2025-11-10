export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  bodyType: string;
  engine: string;
  transmission: string;
  exteriorColor: string;
  interiorColor: string;
  features: string[];
  images: string[]; // Corresponds to id in placeholder-images.json
  tourUrl?: string; // Optional URL for 360 tour video
  description?: string;
  status: 'Available' | 'Sold' | 'Pending';
};
