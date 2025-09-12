import type { RequestHandler } from '@sveltejs/kit';
import { users } from '$lib/userStore';
import type { User } from '$lib/userStore';

// GET /api/profile?userId=123 - fetch profile
export const GET: RequestHandler = async ({ url }) => {
  const userIdStr = url.searchParams.get('userId');

  if (!userIdStr) {
    return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
  }

  const userId = Number(userIdStr);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  // Exclude password from response
  const { password, ...safeUser } = user;

  return new Response(JSON.stringify(safeUser), { status: 200 });
};

// PUT /api/profile - update user profile
export const PUT: RequestHandler = async ({ request }) => {
  const updateData: Partial<User> = await request.json();

  if (!updateData.id) {
    return new Response(JSON.stringify({ error: 'User id required' }), { status: 400 });
  }

  const userIndex = users.findIndex(u => u.id === updateData.id);

  if (userIndex === -1) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  // Update fields (except password intentionally, or include with validation)
  users[userIndex] = { ...users[userIndex], ...updateData };

  // Exclude password in response
  const { password, ...safeUser } = users[userIndex];

  return new Response(JSON.stringify({ success: true, user: safeUser }), { status: 200 });
};
