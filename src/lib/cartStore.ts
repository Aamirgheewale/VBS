import { writable } from 'svelte/store';

export interface CartItem {
  id: string; // unique book id
  title: string;
  author: string;
  price: number;
  image: string;
  quantity: number;
}

export const cart = writable<CartItem[]>([]);

// Add to cart logic
export function addToCart(book: Omit<CartItem, 'quantity'>, qty = 1) {
  cart.update(items => {
    const index = items.findIndex(item => item.id === book.id);
    if (index > -1) {
      // already in cart: increase qty
      items[index].quantity += qty;
    } else {
      items.push({ ...book, quantity: qty });
    }
    return items;
  });
}

// Remove from cart
export function removeFromCart(id: string) {
  cart.update(items => items.filter(item => item.id !== id));
}

// Update quantity
export function setQuantity(id: string, quantity: number) {
  cart.update(items => items.map(item =>
    item.id === id ? ({ ...item, quantity }) : item
  ));
}
