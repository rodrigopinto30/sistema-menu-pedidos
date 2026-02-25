import api from '../lib/api';

export interface OrderItem {
    product_id: number;
    quantity: number;
}

export interface OrderPayload {
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    items: OrderItem[];
}

export const placeOrder = (orderData: OrderPayload) => {
    return api.post('/orders', orderData);
};