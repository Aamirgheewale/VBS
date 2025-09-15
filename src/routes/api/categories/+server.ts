import type { RequestHandler } from '@sveltejs/kit';
import pool from '$lib/db';

// GET: List all categories
export const GET: RequestHandler = async () => {
  try {
    const res = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    return new Response(JSON.stringify(res.rows), { status: 200 });
  } catch (error) {
    console.error('GET /api/categories error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};

// POST: Add a new category
export const POST: RequestHandler = async ({ request }) => {
  const newCategory = await request.json();
  if (!newCategory.name) {
    return new Response(JSON.stringify({ error: 'Category name is required' }), { status: 400 });
  }
  try {
    const res = await pool.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [newCategory.name, newCategory.description || ""]
    );
    return new Response(JSON.stringify({ success: true, category: res.rows[0] }), { status: 201 });
  } catch (error) {
    console.error('POST /api/categories error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
