export interface Book {
  title: string;
}

export const allBooksByGenre: Record<string, Book[]> = {
  Action: [{ title: "Chain of Gold" }],
  Romance: [{ title: "Book Lover" }],
  // Add as needed
};
