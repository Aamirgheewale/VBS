import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import pool from '$lib/db';
import * as bcrypt from 'bcryptjs';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const action = body.action;

    if (action === 'login') {
      const { email, password } = body;

      if (!email || !password) {
        return json({ error: 'Email and password are required.' }, { status: 400 });
      }

      // Find user (using 'name' column)
      const result = await pool.query(
        'SELECT id, name, email, password_hash FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return json({ error: 'Invalid credentials.' }, { status: 401 });
      }

      const user = result.rows[0];

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return json({ error: 'Invalid credentials.' }, { status: 401 });
      }

      // Set session cookie
      cookies.set('sessionId', user.id.toString(), {
        path: '/',
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7
      });

      return json({
        success: true,
        message: 'Login successful.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    }

    return json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Auth error:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ cookies }) => {
  cookies.delete('sessionId', { path: '/' });
  return json({ success: true, message: 'Logged out successfully' });
};
