import type { RequestHandler } from '@sveltejs/kit';

// In-memory cart store
let cartItems: { id: number; bookId: number; quantity: number }[] = [];

// GET /api/cart - get all items in cart
export const GET: RequestHandler = async () => {
  return new Response(JSON.stringify(cartItems), { status: 200 });
};

// POST /api/cart - add an item to the cart
export const POST: RequestHandler = async ({ request }) => {
  const newItem = await request.json();

  if (!newItem.bookId || !newItem.quantity) {
    return new Response(
      JSON.stringify({ error: 'bookId and quantity are required' }),
      { status: 400 }
    );
  }

  // Assign an id to the cart item
  const id = Date.now();
  cartItems.push({ id, ...newItem });

  return new Response(
    JSON.stringify({ success: true, message: 'Item added to cart', id }),
    { status: 201 }
  );
};

// DELETE /api/cart - remove an item from cart
export const DELETE: RequestHandler = async ({ request }) => {
  const { id } = await request.json();

  cartItems = cartItems.filter(item => item.id !== id);

  return new Response(
    JSON.stringify({ success: true, message: 'Item removed from cart' }),
    { status: 200 }
  );
};
