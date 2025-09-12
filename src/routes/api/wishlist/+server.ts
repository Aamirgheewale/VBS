import type { RequestHandler } from '@sveltejs/kit';

// In-memory wishlist store
let wishlistItems: { id: number; userId: number; bookId: number }[] = [];

// GET /api/wishlist?userId=1 - get wishlist for user
export const GET: RequestHandler = async ({ url }) => {
  const userIdStr = url.searchParams.get('userId');
  if (!userIdStr) {
    return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
  }
  const userId = Number(userIdStr);
  const userWishlist = wishlistItems.filter(item => item.userId === userId);
  return new Response(JSON.stringify(userWishlist), { status: 200 });
};

// POST /api/wishlist - add item to wishlist
export const POST: RequestHandler = async ({ request }) => {
  const newItem = await request.json();

  if (!newItem.userId || !newItem.bookId) {
    return new Response(JSON.stringify({ error: 'userId and bookId required' }), { status: 400 });
  }

  const id = Date.now();
  wishlistItems.push({ id, ...newItem });

  return new Response(
    JSON.stringify({ success: true, message: 'Added to wishlist', id }),
    { status: 201 }
  );
};

// DELETE /api/wishlist - remove item from wishlist by id
export const DELETE: RequestHandler = async ({ request }) => {
  const { id } = await request.json();

  if (!id) {
    return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });
  }

  wishlistItems = wishlistItems.filter(item => item.id !== id);

  return new Response(JSON.stringify({ success: true, message: 'Removed from wishlist' }), {
    status: 200,
  });
};
console.log('Wishlist Items:', wishlistItems);
