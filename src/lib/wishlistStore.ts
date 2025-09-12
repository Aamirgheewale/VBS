import { writable } from 'svelte/store';

export interface WishlistItem {
  id: string;
  title: string;
  author: string;
  image: string;
  price: number;
}

const stored = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('wishlist') || '[]') : [];

export const wishlist = writable<WishlistItem[]>(stored);

wishlist.subscribe(items => {
  if (typeof localStorage !== 'undefined') localStorage.setItem('wishlist', JSON.stringify(items));
});

// Add to wishlist
export function addToWishlist(book: WishlistItem) {
  wishlist.update(items => {
    if (!items.some(b => b.id === book.id)) {
      return [...items, book];
    }
    return items;
  });
}

// Remove from wishlist
export function removeFromWishlist(id: string) {
  wishlist.update(items => items.filter(item => item.id !== id));
}