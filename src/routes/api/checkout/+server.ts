// import type { RequestHandler } from '@sveltejs/kit';

// let orders: {
//   id: number;
//   userId: number;
//   items: { bookId: number; quantity: number }[];
//   totalAmount: number;
//   createdAt: string;
// }[] = [];

// export const POST: RequestHandler = async ({ request }) => {
//   const orderData = await request.json();

//   if (
//     !orderData.userId ||
//     !Array.isArray(orderData.items) ||
//     orderData.items.length === 0 ||
//     orderData.totalAmount == null ||
//     isNaN(orderData.totalAmount)
//   ) {
//     return new Response(JSON.stringify({ error: 'Missing or invalid required order data' }), { status: 400 });
//   }

//   const newOrder = {
//     id: Date.now(),
//     userId: orderData.userId,
//     items: orderData.items,
//     totalAmount: Number(orderData.totalAmount.toFixed(2)),
//     createdAt: new Date().toISOString(),
//   };

//   orders.push(newOrder);

//   return new Response(
//     JSON.stringify({ success: true, message: 'Order placed successfully', orderId: newOrder.id }),
//     { status: 201 }
//   );
// };

// import type { RequestHandler } from '@sveltejs/kit';
// import { Pool } from 'pg';

// // Assume you have a pg Pool instance, configure with NeonDB connection string
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   // ssl config, etc.
// });

// export const POST: RequestHandler = async ({ request }) => {
//   const { userId, items } = await request.json();

//   if (
//     !userId ||
//     !Array.isArray(items) ||
//     items.length === 0
//   ) {
//     return new Response(JSON.stringify({ error: 'Missing or invalid required data' }), { status: 400 });
//   }

//   const client = await pool.connect();

//   try {
//     await client.query('BEGIN');

//     // Calculate total amount from items' quantities and stored price in DB or passed data
//     // For security consider querying current prices; here we trust posted price
//     // But since you got only items with bookId, qty, you might need to query prices now
//     // For this example, assume each item has price property (add this if your client sends)
//     let totalAmount = 0;
//     for (const item of items) {
//       if (
//         typeof item.bookId !== 'number' ||
//         typeof item.quantity !== 'number' ||
//         item.quantity <= 0
//       ) {
//         throw new Error('Invalid item data');
//       }
//       // Here fetch current price from DB or accept item.price if sent
//       // For demo, assume price = 100 (replace with real logic)
//       const price = 100;
//       totalAmount += price * item.quantity;
//     }

//     // Insert row to orders table
//     const insertOrderQuery = `
//       INSERT INTO orders (user_id, order_date, total_amount)
//       VALUES ($1, NOW(), $2)
//       RETURNING id
//     `;
//     const resOrder = await client.query(insertOrderQuery, [userId, totalAmount]);
//     const orderId = resOrder.rows[0].id;

//     // Insert into order_items table for each item
//     const insertItemQuery = `
//       INSERT INTO order_items (order_id, book_id, quantity, price_at_purchase)
//       VALUES ($1, $2, $3, $4)
//     `;
//     for (const item of items) {
//       // Again you should query or have client's price, here use dummy 100
//       const priceAtPurchase = 100;
//       await client.query(insertItemQuery, [orderId, item.bookId, item.quantity, priceAtPurchase]);
//     }

//     // Delete user's cart items after successful order
//     await client.query(
//       'DELETE FROM cart_items WHERE user_id = $1',
//       [userId]
//     );

//     await client.query('COMMIT');

//     return new Response(JSON.stringify({ success: true, orderId }), { status: 201 });

//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error(error);
//     return new Response(JSON.stringify({ error: 'Server error during order processing' }), { status: 500 });
//   } finally {
//     client.release();
//   }
// };

// import type { RequestHandler } from '@sveltejs/kit';
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   // Add ssl or other configs here as needed
// });

// export const POST: RequestHandler = async ({ request }) => {
//   const { userId, items } = await request.json();

//   if (
//     !userId ||
//     !Array.isArray(items) ||
//     items.length === 0
//   ) {
//     return new Response(JSON.stringify({ error: 'Missing or invalid required data' }), { status: 400 });
//   }

//   const client = await pool.connect();

//   try {
//     await client.query('BEGIN');

//     // Calculate total with actual prices & validate each book exists
//     let totalAmount = 0;
//     for (const item of items) {
//       if (
//         typeof item.bookId !== 'number' ||
//         typeof item.quantity !== 'number' ||
//         item.quantity <= 0
//       ) {
//         throw new Error('Invalid item data');
//       }
//       const priceResult = await client.query(
//         'SELECT price FROM books WHERE id = $1',
//         [item.bookId]
//       );
//       if (priceResult.rowCount === 0) {
//         throw new Error(`Book with id ${item.bookId} not found`);
//       }
//       const price = priceResult.rows[0].price;
//       totalAmount += price * item.quantity;
//       item.price = price; // store price with item for later insert
//     }

//     // Insert order and get order id
//     const orderInsert = await client.query(
//       `INSERT INTO orders (user_id, order_date, total_amount)
//        VALUES ($1, NOW(), $2)
//        RETURNING id`,
//       [userId, totalAmount]
//     );
//     const orderId = orderInsert.rows[0].id;

//     // Insert order items with actual prices
//     for (const item of items) {
//       await client.query(
//         `INSERT INTO order_items (order_id, book_id, quantity, price_at_purchase)
//          VALUES ($1, $2, $3, $4)`,
//         [orderId, item.bookId, item.quantity, item.price]
//       );
//     }

//     // Clear user's cart
//     await client.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);

//     await client.query('COMMIT');

//     return new Response(
//       JSON.stringify({ success: true, orderId }),
//       { status: 201 }
//     );
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error('Checkout error:', error);
//     return new Response(
//       JSON.stringify({ error: 'Failed to process order' }),
//       { status: 500 }
//     );
//   } finally {
//     client.release();
//   }
// };

import type { RequestHandler } from '@sveltejs/kit';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const POST: RequestHandler = async ({ request }) => {
  const { userId, items } = await request.json();

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return new Response(JSON.stringify({ error: 'Missing or invalid required data' }), { status: 400 });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Calculate total using latest DB prices
    let totalAmount = 0;
    for (const item of items) {
      console.log('Processing item:', item);
      if (
        typeof item.bookId !== 'number' ||
        typeof item.quantity !== 'number' ||
        item.quantity <= 0
      ) {
        throw new Error('Invalid item data');
      }
      const priceResult = await client.query(
        'SELECT price FROM books WHERE id = $1',
        [item.bookId]
      );
      if (priceResult.rowCount === 0) {
        throw new Error(`Book with id ${item.bookId} not found`);
      }
      const price = priceResult.rows[0].price;
      totalAmount += price * item.quantity;
      item.price = price; // used for insertion below
    }

    // Insert order
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, order_date, total_amount)
       VALUES ($1, NOW(), $2)
       RETURNING id`,
      [userId, totalAmount]
    );
    const orderId = orderResult.rows[0].id;

    // Insert each item
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, book_id, quantity, price_at_purchase)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.bookId, item.quantity, item.price]
      );
    }

    // Clear user's cart
    // await client.query(
    //   'DELETE FROM cart_items WHERE user_id = $1',
    //   [userId]
    // );

    const cartResult = await client.query('SELECT id FROM carts WHERE user_id = $1', [userId]);
if (cartResult.rowCount === 1) {
  const cartId = cartResult.rows[0].id;
  await client.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
}

    await client.query('COMMIT');
    return new Response(
      JSON.stringify({ success: true, orderId }),
      { status: 201 }
    );
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Checkout backend error:', error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500 }
    );
  } finally {
    client.release();
  }
  console.log('Checkout received:', { userId, items });

};
