import { writable } from 'svelte/store';

export interface PurchasedBook {
  id: string;
  title: string;
  cover: string;
  pdfUrl?: string;
}

const storedPurchased = typeof localStorage !== 'undefined'
  ? JSON.parse(localStorage.getItem('purchasedBooks') || '[]')
  : [];

export const purchasedBooksStore = writable<PurchasedBook[]>(storedPurchased);

purchasedBooksStore.subscribe((items) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('purchasedBooks', JSON.stringify(items));
  }
});
