// src/routes/api/user/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import pool from '$lib/db';
import * as bcrypt from 'bcryptjs';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { firstName, lastName, email, phone, password } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return new Response(JSON.stringify({ error: 'Required fields missing' }), { status: 400 });
    }

    const name = `${firstName} ${lastName}`;

    // Check if user exists
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return new Response(JSON.stringify({ error: 'Email already in use.' }), { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, phone, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, name, email, phone',
      [name, email, phone, passwordHash]
    );
    const newUser = result.rows[0];

    return new Response(JSON.stringify({ success: true, user: newUser }), { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};