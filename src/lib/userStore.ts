import { writable } from 'svelte/store';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  loggedIn: boolean;
}

const storedUser: User = typeof localStorage !== 'undefined' && localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') as string)
  : {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      loggedIn: false
    };

export const userStore = writable(storedUser);

userStore.subscribe(user => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
});
