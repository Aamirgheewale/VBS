export interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  publishedYear?: number;
}

export const books: Book[] = [
  {
    id: 1,
    title: 'Sample Book 1',
    author: 'Author One',
    description: 'A sample description',
    publishedYear: 2020
  },
  {
    id: 2,
    title: 'Sample Book 2',
    author: 'Author Two'
  }
];
