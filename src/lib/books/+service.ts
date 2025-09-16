export interface Book {
  // id: number;
  // title: string;
  // author: string;
  // description?: string;
  // publishedYear?: number;
  id: number;
  title: string;
  author: string;
  price: number;
  img?: string;  // or cover_image_url?: string;
  cover_image_url?: string;  // or img?: string;
  description?: string;
  publisher?: string;
  pubDate?: string;
  language?: string;
  age?: string;
  pages?: number;
  dimensions?: string;
  rating?: number;
  // Add any field you render in the template!
}


// export const books: Book[] = [
//   {
//     id: 1,
//     title: 'Sample Book 1',
//     author: 'Author One',
//     description: 'A sample description',
//     publishedYear: 2020
//   },
//   {
//     id: 2,
//     title: 'Sample Book 2',
//     author: 'Author Two'
//   }
// ];
