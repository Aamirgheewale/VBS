import { writable } from 'svelte/store';

export interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  quantity: number;
  pdfUrl?: string; // Optional PDF URL
}

const storedCart = typeof localStorage !== 'undefined'
  ? JSON.parse(localStorage.getItem('cart') || '[]')
  : [];

export const cart = writable<CartItem[]>(storedCart);

cart.subscribe((items) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items));
  }
});

export function addToCart(book: Omit<CartItem, 'quantity'>, qty = 1) {
  cart.update(items => {
    const index = items.findIndex(item => item.id === book.id);
    if (index > -1) {
      items[index].quantity += qty;
    } else {
      items.push({ ...book, quantity: qty });
    }
    return items;
  });
}

export function removeFromCart(id: string) {
  cart.update(items => items.filter(item => item.id !== id));
}

export function setQuantity(id: string, quantity: number) {
  cart.update(items =>
    items.map(item => (item.id === id ? { ...item, quantity } : item))
  );
}

// New - clear all items from cart after purchase
export function clearCart() {
  cart.set([]);
}
