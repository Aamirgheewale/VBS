import type { RequestHandler } from '@sveltejs/kit';
import { users, type User } from '$lib/userStore';

// Simple in-memory sessions store
const sessions: Record<string, boolean> = {};

// POST /api/auth - handle signup or login based on "action" in body
export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const action = body.action;

  if (action === 'signup') {
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and password are required.' }),
        { status: 400 }
      );
    }

    if (users.find(u => u.email === email)) {
      return new Response(
        JSON.stringify({ error: 'Email already registered.' }),
        { status: 409 }
      );
    }

    const id = Date.now();
    users.push({ id, name, email, password });

    return new Response(
      JSON.stringify({ success: true, message: 'User registered successfully.', id }),
      { status: 201 }
    );
  }

  if (action === 'login') {
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required.' }),
        { status: 400 }
      );
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    sessions[email] = true;

    return new Response(
      JSON.stringify({ success: true, message: 'Logged in', userId: user.id }),
      { status: 200 }
    );
  }

  return new Response(
    JSON.stringify({ error: 'Invalid POST action' }),
    { status: 400 }
  );
};

// DELETE /api/auth/logout - user logout
export const DELETE: RequestHandler = async ({ request }) => {
  const { email } = await request.json();

  if (sessions[email]) {
    delete sessions[email];
    return new Response(JSON.stringify({ success: true, message: 'Logged out' }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: 'Not logged in' }), { status: 400 });
};
// GET /api/auth/status - check if user is logged in
