import { getSchemaInfo } from '../../../lib/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const schemaData = await getSchemaInfo();
    
    const formattedSchema = schemaData.map(table => ({
      table: table.table_name,
      columns: table.columns
    }));

    return NextResponse.json({ 
      success: true, 
      schema: formattedSchema
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Schema query failed'
      },
      { status: 500 }
    );
  }
} 