import type { RequestHandler } from '@sveltejs/kit';
import pool from '$lib/db';
import { wishlist, addToWishlist, removeFromWishlist  } from '$lib/wishlistStore';

// GET: wishlist items for a user, including book info
export const GET: RequestHandler = async ({ url }) => {
  const userIdStr = url.searchParams.get('userId');
  if (!userIdStr) {
    return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
  } 
  const userId = Number(userIdStr);

  try {
    const result = await pool.query(`
      SELECT w.id, w.book_id, b.title, b.price, b.cover_image_url AS image 
      FROM wishlist w 
      JOIN books b ON w.book_id = b.id 
      WHERE w.user_id = $1
    `, [userId]);

    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error('GET /api/wishlist error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};

// POST: add item to wishlist
export const POST: RequestHandler = async ({ request }) => {
  const { userId, bookId } = await request.json();

  if (!userId || !bookId) {
    return new Response(JSON.stringify({ error: 'userId and bookId required' }), { status: 400 });
  }

  try {
    // Check if already in wishlist to avoid duplicates
    const exists = await pool.query(
      'SELECT id FROM wishlist WHERE user_id = $1 AND book_id = $2',
      [userId, bookId]
    );
    if (exists.rows.length > 0) {
      return new Response(JSON.stringify({ success: true, message: 'Already in wishlist' }), { status: 200 });
    }

    // Insert new wishlist item
    const result = await pool.query(
      'INSERT INTO wishlist (user_id, book_id) VALUES ($1, $2) RETURNING id',
      [userId, bookId]
    );

    return new Response(JSON.stringify({ success: true, id: result.rows[0].id }), { status: 201 });
  } catch (error) {
    console.error('POST /api/wishlist error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};

// DELETE: remove item from wishlist by id
export const DELETE: RequestHandler = async ({ request }) => {
  const { id } = await request.json();

  if (!id) {
    return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });
  }

  try {
    await pool.query('DELETE FROM wishlist WHERE id = $1', [id]);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('DELETE /api/wishlist error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
