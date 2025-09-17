import { writable } from 'svelte/store';

export interface WishlistItem {
  id: string; // wishlist row ID, not book ID!
  bookId: number;
  title: string;
  author: string;
  image: string;
  price: number;
}

// Start with empty array; no localStorage
export const wishlist = writable<WishlistItem[]>([]);
