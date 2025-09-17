// // import type { RequestHandler } from '@sveltejs/kit';
// // import pool from '$lib/db';

// // // GET: Fetch user's purchased books with book details
// // export const GET: RequestHandler = async ({ url }) => {
// //   const userId = url.searchParams.get('userId');
// //   if (!userId) {
// //     return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
// //   }

// //   try {
// //     const result = await pool.query(`
// //       SELECT p.id, b.id AS bookId, b.title, b.author, b.price, b.cover_image_url AS cover, b.pdf_url
// //       FROM purchased_books p
// //       JOIN books b ON p.book_id = b.id
// //       WHERE p.user_id = $1
// //       ORDER BY p.id DESC
// //     `, [Number(userId)]);
// //     return new Response(JSON.stringify(result.rows), { status: 200 });
// //   } catch (error) {
// //     console.error('GET /api/purchased error:', error);
// //     return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
// //   }
// // };

// // // POST: Add multiple purchased books at once (with quantities)
// // export const POST: RequestHandler = async ({ request }) => {
// //   try {
// //     const body = await request.json();
// //     const { userId, items } = body;

// //     if (!userId || !Array.isArray(items) || items.length === 0) {
// //       return new Response(JSON.stringify({ error: 'Invalid request data: userId and items required' }), { status: 400 });
// //     }

// //     // Validate bookIds are all numbers
// //     const bookIds = items.map(item => Number(item.bookId)).filter(id => !isNaN(id));
// //     if (bookIds.length === 0) {
// //       return new Response(JSON.stringify({ error: 'Invalid bookIds in items' }), { status: 400 });
// //     }

// //     const existsResult = await pool.query(
// //       'SELECT book_id FROM purchased_books WHERE user_id = $1 AND book_id = ANY($2)',
// //       [Number(userId), bookIds]
// //     );
// //     const existingBookIds = new Set(existsResult.rows.map(r => r.book_id));

// //     const client = await pool.connect();
// //     try {
// //       await client.query('BEGIN');

// //       for (const item of items) {
// //         const bookId = Number(item.bookId);
// //         if (existingBookIds.has(bookId)) {
// //           // Skip duplicates
// //           continue;
// //         }
// //         await client.query(
// //           'INSERT INTO purchased_books (user_id, book_id) VALUES ($1, $2)',
// //           [Number(userId), bookId]
// //         );
// //       }

// //       await client.query('COMMIT');
// //     } catch (e) {
// //       await client.query('ROLLBACK');
// //       console.error('Transaction error in POST /api/purchased:', e);
// //       throw e;
// //     } finally {
// //       client.release();
// //     }

// //     return new Response(JSON.stringify({ success: true, message: 'Purchased books recorded' }), { status: 201 });
// //   } catch (error) {
// //     console.error('POST /api/purchased error:', error);
// //     return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
// //   }
// // };


// import type { RequestHandler } from '@sveltejs/kit';
// import pool from '$lib/db';

// // GET: Fetch user's purchased books with book details
// export const GET: RequestHandler = async ({ url }) => {
//   const userId = url.searchParams.get('userId');
//   if (!userId) {
//     return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
//   }

//   try {
//     const result = await pool.query(`
//       SELECT p.id, b.id AS bookId, b.title, b.author, b.price, b.cover_image_url AS cover, b.pdf_url
//       FROM purchased_books p
//       JOIN books b ON p.book_id = b.id
//       WHERE p.user_id = $1
//       ORDER BY p.id DESC
//     `, [Number(userId)]);
//     return new Response(JSON.stringify(result.rows), { status: 200 });
//   } catch (error) {
//     console.error('GET /api/purchased error:', error);
//     return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//   }
// };

// // POST: Add multiple purchased books at once (with quantities)
// export const POST: RequestHandler = async ({ request }) => {
//   try {
//     const body = await request.json();
//     const { userId, items } = body;

//     if (!userId || !Array.isArray(items) || items.length === 0) {
//       return new Response(JSON.stringify({ error: 'Invalid request data: userId and items required' }), { status: 400 });
//     }

//     // Validate bookIds are numbers and filter out invalid entries
//     const bookIds = items.map(item => Number(item.bookId)).filter(id => !isNaN(id));
//     if (bookIds.length === 0) {
//       return new Response(JSON.stringify({ error: 'Invalid bookIds in items' }), { status: 400 });
//     }

//     // Fetch already purchased bookIds for this user
//     const existsResult = await pool.query(
//       'SELECT book_id FROM purchased_books WHERE user_id = $1 AND book_id = ANY($2)',
//       [Number(userId), bookIds]
//     );
//     const existingBookIds = new Set(existsResult.rows.map(r => r.book_id));

//     const client = await pool.connect();
//     try {
//       await client.query('BEGIN');

//       // Insert only books not already purchased
//       for (const item of items) {
//         const bookId = Number(item.bookId);
//         if (existingBookIds.has(bookId)) {
//           continue; // skip duplicates
//         }
//         await client.query(
//           'INSERT INTO purchased_books (user_id, book_id) VALUES ($1, $2)',
//           [Number(userId), bookId]
//         );
//       }

//       await client.query('COMMIT');
//     } catch (e) {
//       await client.query('ROLLBACK');
//       console.error('Transaction error in POST /api/purchased:', e);
//       throw e;
//     } finally {
//       client.release();
//     }

//     return new Response(JSON.stringify({ success: true, message: 'Purchased books recorded' }), { status: 201 });
//   } catch (error) {
//     console.error('POST /api/purchased error:', error);
//     return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//   }
// };


// import type { RequestHandler } from '@sveltejs/kit';
// import pool from '$lib/db';

// // GET: Fetch purchased books with full book info
// export const GET: RequestHandler = async ({ url }) => {
//   const userIdStr = url.searchParams.get('userId');
//   if (!userIdStr) return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });

//   const userId = Number(userIdStr);

//   try {
//     const result = await pool.query(`
//       SELECT 
//         p.id, 
//         p.quantity,
//         p.price_at_purchase,
//         b.id AS bookId, 
//         b.title, 
//         b.author, 
//         b.price,
//         b.cover_image_url AS cover, 
//         b.pdf_url
//       FROM order_items p
//       JOIN books b ON p.book_id = b.id
//       JOIN orders o ON p.order_id = o.id
//       WHERE o.user_id = $1 
//       ORDER BY o.order_date DESC
//     `, [userId]);

//     return new Response(JSON.stringify(result.rows), { status: 200 });
//   } catch (error) {
//     console.error('GET /api/purchased error:', error);
//     return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//   }
// };

// // POST: Add purchased books (for batch insert of purchased items)
// export const POST: RequestHandler = async ({ request }) => {
//   try {
//     const { userId, items } = await request.json();

//     if (!userId || !Array.isArray(items) || items.length === 0) {
//       return new Response(JSON.stringify({ error: 'Invalid request data: userId and items required' }), { status: 400 });
//     }

//     // Validate input: ensure all bookIds are numbers
//     const bookIds = items.map(item => Number(item.bookId)).filter(id => !isNaN(id));
//     if (bookIds.length === 0) {
//       return new Response(JSON.stringify({ error: 'Invalid bookIds in items' }), { status: 400 });
//     }

//     // Fetch existing purchased bookIds for user to avoid duplicates
//     const existsResult = await pool.query(
//       'SELECT book_id FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE o.user_id = $1 AND oi.book_id = ANY($2)',
//       [userId, bookIds]
//     );

//     const existingBookIds = new Set(existsResult.rows.map(r => r.book_id));

//     const client = await pool.connect();

//     try {
//       await client.query('BEGIN');

//       // Insert new orders and order_items here if needed OR just add items to existing purchase records

//       // Usually, purchases happen with order creation, 
//       // but this endpoint can add missing purchased records – ensure no duplicate entries.

//       for (const item of items) {
//         if (existingBookIds.has(item.bookId)) continue; // skip duplicates

//         // Simple case: add to purchased list without order association (if your schema allows)
//         // OR throw error or handle accordingly

//       }

//       await client.query('COMMIT');
//     } catch (e) {
//       await client.query('ROLLBACK');
//       console.error('Transaction error in /api/purchased POST:', e);
//       throw e;
//     } finally {
//       client.release();
//     }

//     return new Response(JSON.stringify({ success: true, message: 'Purchased books recorded' }), { status: 201 });
//   } catch (error) {
//     console.error('POST /api/purchased error:', error);
//     return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//   }
// };


import type { RequestHandler } from '@sveltejs/kit';
import pool from '$lib/db';

// GET: Show purchased books for the user
export const GET: RequestHandler = async ({ url }) => {
  const userIdStr = url.searchParams.get('userId');
  if (!userIdStr) {
    return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
  }
  const userId = Number(userIdStr);

  try {
    const result = await pool.query(`
      SELECT
        oi.id,
        oi.quantity,
        oi.price_at_purchase,
        b.id AS bookId,
        b.title,
        b.author,
        b.price,
        b.cover_image_url AS cover,
        b.pdf_url
      FROM order_items oi
      JOIN books b ON oi.book_id = b.id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.user_id = $1
      ORDER BY o.order_date DESC, oi.id DESC
    `, [userId]);
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error('GET /api/purchased error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};

// No POST handler necessary here if you always purchase via checkout
