import type { RequestHandler } from '@sveltejs/kit';
import pool from '$lib/db';
import { randomBytes } from 'crypto';

export const POST: RequestHandler = async ({ request }) => {
  const { email } = await request.json();

  if (!email) {
    return new Response(
      JSON.stringify({ error: 'Email is required' }),
      { status: 400 }
    );
  }

  try {
    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      // Always return success to avoid email enumeration
      return new Response(
        JSON.stringify({ success: true, message: 'If email exists, reset link sent.' }),
        { status: 200 }
      );
    }

    const userId = userResult.rows[0].id;

    // Generate token
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour expiry

    // Store token in password_resets table (create this table in your DB)
    await pool.query(
      `INSERT INTO password_resets (user_id, token, expires_at)
       VALUES ($1, $2, $3)`,
      [userId, token, expiresAt]
    );

    // TODO: Send email with reset link including token

    return new Response(
      JSON.stringify({ success: true, message: 'If email exists, reset link sent.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
};
