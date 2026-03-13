import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,   
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  ssl: { rejectUnauthorized: false },
});

try {
    await pool.getConnection();
    console.log('Connected to the database successfully!');
} catch (error) {
    console.error('Error connecting to the database:', error);
}

export default pool;