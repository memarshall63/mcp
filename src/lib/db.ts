import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES6_URL,
  ssl: {
    rejectUnauthorized: false // Required for Supabase connections
  }
});

// Export the query function as a named export
export const query = async (text: string, params: any[] = []) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}; 