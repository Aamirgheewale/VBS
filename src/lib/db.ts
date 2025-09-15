import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

console.log('DATABASE_URL:', process.env.DATABASE_URL);

pool.query('SELECT NOW()')
  .then(res => console.log('NeonDB connected, current time:', res.rows[0].now))
  .catch(err => console.error('NeonDB connection error:', err));

export default pool;
