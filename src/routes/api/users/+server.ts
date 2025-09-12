import type { RequestHandler } from '@sveltejs/kit';
import { userStore } from '$lib/userStore';

// In-memory user store:
let users: { id: number; name: string; email: string; password: string }[] = [];

// GET: return all users (for testing only; typically not public)
export const GET: RequestHandler = async () => {
  // For security, you might want to exclude passwords here or implement auth
  const safeUsers = users.map(({ password, ...rest }) => rest);
  return new Response(JSON.stringify(safeUsers), { status: 200 });
};

// POST: add a new user (signup)
export const POST: RequestHandler = async ({ request }) => {
  const newUser = await request.json();

  // Basic validation example
  if (!newUser.name || !newUser.email || !newUser.password) {
    return new Response(
      JSON.stringify({ error: 'Name, email, and password are required.' }),
      { status: 400 }
    );
  }

  // Check if email already exists
  if (users.find((u) => u.email === newUser.email)) {
    return new Response(
      JSON.stringify({ error: 'Email already registered.' }),
      { status: 409 }
    );
  }

  // Add user with unique ID
  users.push({ ...newUser, id: Date.now() });

  return new Response(
    JSON.stringify({ success: true, message: 'User registered successfully.' }),
    { status: 201 }
  );
};
