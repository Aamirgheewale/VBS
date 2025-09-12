import type { RequestHandler } from '@sveltejs/kit';
import { users } from '$lib/userStore';  // Assume shared user data

export const POST: RequestHandler = async ({ request }) => {
  const { email } = await request.json();

  if (!email) {
    return new Response(
      JSON.stringify({ error: 'Email is required' }),
      { status: 400 }
    );
  }

  // Check if user exists
  const userExists = users.some(user => user.email === email);

  if (!userExists) {
    // To prevent user enumeration, respond with success anyway
    return new Response(
      JSON.stringify({ success: true, message: 'If email exists, reset link sent.' }),
      { status: 200 }
    );
  }

  // TODO: send reset email with token here

  return new Response(
    JSON.stringify({ success: true, message: 'If email exists, reset link sent.' }),
    { status: 200 }
  );
};
