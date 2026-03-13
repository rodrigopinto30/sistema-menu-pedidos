import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const isServer = typeof window === 'undefined';
const baseURL = isServer 
  ? 'http://menu_pedidos_nginx/api' 
  : 'http://localhost:8000/api';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

api.interceptors.request.use((config: any) => {
    if (!isServer) {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error: any) => {
    return Promise.reject(error);
});

export async function getMenu() {
    console.log(`Fetching menu from: ${baseURL}/menu`);
    try {
        const res = await api.get('/menu');
        return res.data;
    } catch (error) {
        console.error("Error fetching menu:", error);
        throw new Error("Failed to fetch menu");
    }
}

export default api;