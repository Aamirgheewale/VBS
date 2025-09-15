import type { RequestHandler } from '@sveltejs/kit';
import pool from '$lib/db';
import type { User } from '$lib/userStore';

// GET /api/profile?userId=123 - fetch profile
export const GET: RequestHandler = async ({ url }) => {
  const userIdStr = url.searchParams.get('userId');

  if (!userIdStr) {
    return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
  }

  const userId = Number(userIdStr);

  try {
    const result = await pool.query(
      'SELECT id, name, email, password_hash FROM users WHERE email = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Return safe user info without password hash etc.
    const safeUser = result.rows[0];

    return new Response(JSON.stringify(safeUser), { status: 200 });

  } catch (error) {
    console.error('Profile GET error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};

// PUT /api/profile - update user profile
export const PUT: RequestHandler = async ({ request }) => {
  try {
    const updateData: Partial<User> = await request.json();

    if (!updateData.id) {
      return new Response(JSON.stringify({ error: 'User id required' }), { status: 400 });
    }

    // Allowed fields to update (only those in your table)
    const allowedFields = ['name', 'email', 'phone'];

    const fields = [];
    const values = [];
    let index = 1;

    for (const field of allowedFields) {
      if (updateData[field as keyof User] !== undefined) {
        fields.push(`${field} = $${index}`);
        values.push(updateData[field as keyof User]);
        index++;
      }
    }

    if (fields.length === 0) {
      return new Response(JSON.stringify({ error: 'No fields to update' }), { status: 400 });
    }

    values.push(updateData.id);

    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING id, name, email, phone`;
    const result = await pool.query(sql, values);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const safeUser = result.rows[0];

    return new Response(JSON.stringify({ success: true, user: safeUser }), { status: 200 });

  } catch (error) {
    console.error('Profile PUT error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
