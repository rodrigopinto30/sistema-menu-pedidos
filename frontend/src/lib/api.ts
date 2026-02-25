import axios from 'axios';

export async function getMenu() {
  const isServer = typeof window === 'undefined';
  
  const baseUrl = isServer 
    ? 'http://menu_pedidos_nginx/api' 
    : 'http://localhost:8000/api';

  console.log(`Fetching from: ${baseUrl}/menu`);

  const res = await fetch(`${baseUrl}/menu`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch menu: ${res.status} ${res.statusText}`);
  }

  return res.json();
}



const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const placeOrder = (orderData: any) => {
    return api.post('/orders', orderData);
};

export default api;