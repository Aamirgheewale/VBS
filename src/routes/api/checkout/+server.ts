import type { RequestHandler } from '@sveltejs/kit';

// In-memory orders store
let orders: { 
  id: number; 
  userId: number; 
  items: { bookId: number; quantity: number }[]; 
  totalAmount: number; 
  createdAt: string; 
}[] = [];

// POST /api/checkout - create a new order
export const POST: RequestHandler = async ({ request }) => {
  const orderData = await request.json();

  // Basic validation
  if (
    !orderData.userId ||
    !Array.isArray(orderData.items) ||
    orderData.items.length === 0 ||
    !orderData.totalAmount
  ) {
    return new Response(
      JSON.stringify({ error: 'Missing required order data' }),
      { status: 400 }
    );
  }

  const newOrder = {
    id: Date.now(),
    userId: orderData.userId,
    items: orderData.items,
    totalAmount: orderData.totalAmount,
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);

  return new Response(
    JSON.stringify({ success: true, message: 'Order placed successfully', orderId: newOrder.id }),
    { status: 201 }
  );
};
