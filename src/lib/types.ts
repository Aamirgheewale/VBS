export interface Book {
  id?: string | number;
  title?: string;
  author?: string;
  price?: number;
  img?: string;
  loggedIn?: boolean;
  firstName?: string;
  lastName?: string;
  cover_image_url?: string;
  description?: string;
 
}
export interface WishlistItem {
  id: string;
  title: string;
  author: string;
  price: number;
  image?: string;
}