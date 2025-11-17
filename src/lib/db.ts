// import dotenv from 'dotenv';
// dotenv.config();

// import pkg from 'pg';
// const { Pool } = pkg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// console.log('DATABASE_URL:', process.env.DATABASE_URL);

// pool.query('SELECT NOW()')
//   .then(res => console.log('NeonDB connected, current time:', res.rows[0].now))
//   .catch(err => console.error('NeonDB connection error:', err));

// export default pool;


import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

// 1. Log the variable BEFORE using it.
console.log('[DEBUG] DATABASE_URL (before pool):', process.env.DATABASE_URL);

// 2. Create the pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// 3. Log the pool's ACTUAL configuration
// This will show us if it's using 'base' or your Neon URL.
console.log('[DEBUG] Pool options (host):', pool.options.host);
console.log('[DEBUG] Pool options (port):', pool.options.port);
console.log('[DEBUG] Pool options (user):', pool.options.user);

// 4. Test the connection
pool.query('SELECT NOW()')
  .then(res => console.log('NeonDB connected, current time:', res.rows[0].now))
  .catch(err => console.error('NeonDB connection error:', err.message)); // .message is cleaner

export default pool;