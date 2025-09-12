import { writable } from 'svelte/store';

// --- For backend API ---
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// In-memory array for backend users (for API demo/dev purposes)
export const users: User[] = [

    {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password1'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'password2'
  }
];

 

// --- For frontend Svelte stores ---
const storedUser: User = typeof localStorage !== 'undefined' && localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') as string)
  : {
      id: 0,
      name: '',
      email: '',
      password: '',
      // add other fields as needed
    };

export const userStore = writable(storedUser);

userStore.subscribe(user => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
});
