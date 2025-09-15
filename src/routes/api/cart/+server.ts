import type { RequestHandler } from '@sveltejs/kit';
import pool from '$lib/db'; // Your Neon/pg Pool

// GET: Fetch all items for a user's cart (including book details)
export const GET: RequestHandler = async ({ url }) => {
  const userId = url.searchParams.get('user_id');
  if (!userId) {
    return new Response(JSON.stringify({ error: 'user_id required' }), { status: 400 });
  }
  try {
    // Find cart for user
    const cartRes = await pool.query('SELECT id FROM carts WHERE user_id = $1', [userId]);
    if (cartRes.rows.length === 0) return new Response(JSON.stringify([]), { status: 200 });

    const cartId = cartRes.rows[0].id;
    const itemsRes = await pool.query(`
      SELECT ci.id, ci.quantity, b.id AS bookId, b.title, b.author, b.price, b.cover_image_url AS image
      FROM cart_items ci
      JOIN books b ON ci.book_id = b.id
      WHERE ci.cart_id = $1
    `, [cartId]);
    return new Response(JSON.stringify(itemsRes.rows), { status: 200 });
  } catch (error) {
    console.error('GET /api/cart error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};

// POST: Add item to user's cart
export const POST: RequestHandler = async ({ request }) => {
  const { user_id, book_id, quantity } = await request.json();
  if (!user_id || !book_id || !quantity) {
    return new Response(JSON.stringify({ error: 'user_id, book_id, quantity required' }), { status: 400 });
  }
  try {
    // Find or create cart
    let cartId;
    const cartRes = await pool.query('SELECT id FROM carts WHERE user_id = $1', [user_id]);
    if (cartRes.rows.length === 0) {
      const newCartRes = await pool.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING id', [user_id]);
      cartId = newCartRes.rows[0].id;
    } else {
      cartId = cartRes.rows[0].id;
    }
    // Add item to cart
    const itemRes = await pool.query(
      'INSERT INTO cart_items (cart_id, book_id, quantity) VALUES ($1, $2, $3) RETURNING id',
      [cartId, book_id, quantity]
    );
    return new Response(JSON.stringify({ success: true, id: itemRes.rows[0].id }), { status: 201 });
  } catch (error) {
    console.error('POST /api/cart error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};

// DELETE: Remove item from cart by cart_item id
export const DELETE: RequestHandler = async ({ request }) => {
  const { id } = await request.json();
  if (!id) {
    return new Response(JSON.stringify({ error: 'cart_item id required' }), { status: 400 });
  }
  try {
    await pool.query('DELETE FROM cart_items WHERE id = $1', [id]);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('DELETE /api/cart error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
