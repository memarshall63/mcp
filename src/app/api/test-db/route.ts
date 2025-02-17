import { query } from '../../../lib/db';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/test-db:
 *   get:
 *     summary: Database Health Check
 *     description: Returns PostgreSQL database version and connection info
 *     tags:
 *       - Database
 *     responses:
 *       200:
 *         description: Database connection successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 database_info:
 *                   type: object
 *                   properties:
 *                     version:
 *                       type: string
 *                       example: "PostgreSQL 15.4"
 *                     current_database:
 *                       type: string
 *                       example: "postgres"
 *                     current_user:
 *                       type: string
 *                       example: "postgres"
 *       500:
 *         description: Database connection failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
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