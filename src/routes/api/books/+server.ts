import type { RequestHandler } from '@sveltejs/kit';
import pool from '$lib/db';

// GET: fetch all books or a single book by id
export const GET: RequestHandler = async ({ url }) => {
  const idStr = url.searchParams.get('id');

  try {
    if (idStr) {
      const id = Number(idStr);
      const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return new Response(JSON.stringify({ error: 'Book not found' }), { status: 404 });
      }
      return new Response(JSON.stringify(result.rows[0]), { status: 200 });
    }

    // Return all books ordered by title
    const result = await pool.query('SELECT * FROM books ORDER BY title ASC');
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error('GET /api/books error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};

// POST: add a new book
export const POST: RequestHandler = async ({ request }) => {
  const newBook = await request.json();

  // Basic validation
  if (!newBook.title || !newBook.author || !newBook.price || !newBook.category_id) {
    return new Response(
      JSON.stringify({ error: 'Title, author, price, and category_id are required' }),
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      `INSERT INTO books (title, author, description, price, publisher, cover_image_url, category_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        newBook.title,
        newBook.author,
        newBook.description || '',
        newBook.price,
        newBook.publisher || '',
        newBook.cover_image_url || '',
        newBook.category_id,
      ]
    );
    return new Response(JSON.stringify({ success: true, book: result.rows[0] }), { status: 201 });
  } catch (error) {
    console.error('POST /api/books error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};

// PUT: update existing book by id
export const PUT: RequestHandler = async ({ request }) => {
  const updatedBook = await request.json();

  if (!updatedBook.id) {
    return new Response(JSON.stringify({ error: 'Book ID required' }), { status: 400 });
  }
  if (!updatedBook.category_id) {
    return new Response(JSON.stringify({ error: 'category_id is required' }), { status: 400 });
  }

  try {
    const result = await pool.query(
      `UPDATE books
       SET title=$1, author=$2, description=$3, price=$4, publisher=$5, cover_image_url=$6, category_id=$7, updated_at=now()
       WHERE id=$8
       RETURNING *`,
      [
        updatedBook.title,
        updatedBook.author,
        updatedBook.description || '',
        updatedBook.price,
        updatedBook.publisher || '',
        updatedBook.cover_image_url || '',
        updatedBook.category_id,
        updatedBook.id,
      ]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Book not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, book: result.rows[0] }), { status: 200 });
  } catch (error) {
    console.error('PUT /api/books error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};

// DELETE: delete book by id
export const DELETE: RequestHandler = async ({ request }) => {
  const { id } = await request.json();

  if (!id) {
    return new Response(JSON.stringify({ error: 'Book ID required' }), { status: 400 });
  }

  try {
    const result = await pool.query('DELETE FROM books WHERE id=$1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Book not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('DELETE /api/books error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
