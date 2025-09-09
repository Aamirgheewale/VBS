import { writable } from 'svelte/store';

export interface Toast {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info';
}

export const toasts = writable<Toast[]>([]);

let nextId = 1;

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) {
  const id = nextId++;
  toasts.update(current => [...current, { id, message, type }]);

  setTimeout(() => {
    toasts.update(current => current.filter(t => t.id !== id));
  }, duration);
}
