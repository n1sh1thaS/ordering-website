export interface Product {
    _id: string;
    title: string;
    image: string;
    sku: string;
    price: number;
}

export interface CartItem {
    _id: string;
    product_id: string;
    image: string;
    price: number;
    sku: string;
    title: string;
}

export const links = {Products: '/', Cart: '/cart'}