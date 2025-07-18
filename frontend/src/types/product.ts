export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  shipping: string;
  seller: string;
  discount?: number;
  badge?: string;
}