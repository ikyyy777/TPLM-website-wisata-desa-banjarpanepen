export interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  rating: number;
}

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  includes: string[];
  imageUrl: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}