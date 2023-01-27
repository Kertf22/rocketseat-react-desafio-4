import { Product } from "./Product";

export interface Cart {
    items: CartItem[];
};

export interface CartItem extends Product {
    quantity: number;
}