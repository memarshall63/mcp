import { query } from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test query to get database version
    const result = await query('SELECT version(), current_database(), current_user');
    return NextResponse.json({ 
      success: true, 
      database_info: result.rows[0]
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Database connection failed'
      },
      { status: 500 }
    );
  }
} 