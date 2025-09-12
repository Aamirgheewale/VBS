// src/routes/api/books/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { books } from '$lib/books/+service'; // Assuming shared books array here

interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  publishedYear?: number;
}

// GET handler: fetch all books or single book by id query param
export const GET: RequestHandler = async ({ url }) => {
  const idStr = url.searchParams.get('id');

  if (idStr) {
    const id = Number(idStr);
    const book = books.find(b => b.id === id);

    if (!book) {
      return new Response(JSON.stringify({ error: 'Book not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(book), { status: 200 });
  }

  // Return all books if no id specified
  return new Response(JSON.stringify(books), { status: 200 });
};

// POST handler: add a new book
export const POST: RequestHandler = async ({ request }) => {
  const newBook: Partial<Book> = await request.json();

  if (!newBook.title || !newBook.author) {
    return new Response(
      JSON.stringify({ error: 'Title and author are required' }),
      { status: 400 }
    );
  }

  const id = Date.now();
  const book: Book = { id, ...newBook } as Book;

  books.push(book);

  return new Response(
    JSON.stringify({ success: true, message: 'Book added', book }),
    { status: 201 }
  );
};

// PUT handler: update existing book by id
export const PUT: RequestHandler = async ({ request }) => {
  const updatedBook: Partial<Book> = await request.json();

  if (!updatedBook.id) {
    return new Response(
      JSON.stringify({ error: 'Book ID required' }),
      { status: 400 }
    );
  }

  const index = books.findIndex(b => b.id === updatedBook.id);

  if (index === -1) {
    return new Response(
      JSON.stringify({ error: 'Book not found' }),
      { status: 404 }
    );
  }

  books[index] = { ...books[index], ...updatedBook };

  return new Response(
    JSON.stringify({ success: true, message: 'Book updated', book: books[index] }),
    { status: 200 }
  );
};

// DELETE handler: delete book by id
export const DELETE: RequestHandler = async ({ request }) => {
  const { id } = await request.json();

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'Book ID required' }),
      { status: 400 }
    );
  }

  const initialLength = books.length;
  const filteredBooks = books.filter(b => b.id !== id);

  if (filteredBooks.length === initialLength) {
    return new Response(
      JSON.stringify({ error: 'Book not found' }),
      { status: 404 }
    );
  }

  // Update books array indirectly (depends on import/export behavior)
  books.length = 0;
  books.push(...filteredBooks);

  return new Response(
    JSON.stringify({ success: true, message: 'Book deleted' }),
    { status: 200 }
  );
};
