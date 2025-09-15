import { writable } from 'svelte/store';

// User interface aligned with backend user data structure
export interface User {
  id?: number;
  name?: string;        // Changed from firstName/lastName to name (single string)
  email?: string;
  password?: string;
  phone?: string;
  loggedIn?: boolean;
}

// In-memory user array for backend API demo (empty by default)
export const users: User[] = [
  // Example entries commented out
  // {
  //   id: 1,
  //   name: 'Alice Johnson',
  //   email: 'alice@example.com',
  //   password: 'password1'
  // },
  // {
  //   id: 2,
  //   name: 'Bob Smith',
  //   email: 'bob@example.com',
  //   password: 'password2'
  // }
];

// Initialize storedUser from localStorage or default values
const storedUser: User = typeof localStorage !== 'undefined' && localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') as string)
  : {
      id: 0,
      name: '',
      email: '',
      password: '',
      phone: '',
      loggedIn: false,
    };

// Create writable Svelte store for user
export const userStore = writable<User>(storedUser);

// Sync user store to localStorage on changes
userStore.subscribe(user => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
});
