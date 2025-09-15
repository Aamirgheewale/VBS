import type { RequestHandler } from '@sveltejs/kit';
import pool from '$lib/db';

export const GET: RequestHandler = async ({ url }) => {
  const categoryId = url.searchParams.get('category_id');
  if (!categoryId) {
    return new Response(JSON.stringify({ error: 'category_id is required' }), { status: 400 });
  }
  try {
    const query = `
      SELECT id, title, author, price, cover_image_url AS img
      FROM books
      WHERE category_id = $1
    `;
    const res = await pool.query(query, [categoryId]);
    return new Response(JSON.stringify(res.rows), { status: 200 });
  } catch (error) {
    console.error('GET books for category error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
