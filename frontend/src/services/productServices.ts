import api from '@/lib/api';

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category_id?: number;
}

export interface Category {
  id: number;
  name: string;
  products: Product[]; 
}

export const getMenu = async (): Promise<Category[]> => {
  const response = await api.get('/menu');
  return response.data; 
};