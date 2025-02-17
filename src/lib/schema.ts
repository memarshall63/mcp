import { query } from './db';

export async function getSchemaInfo() {
  const schemaQuery = `
    SELECT 
      t.table_name,
      array_agg(
        DISTINCT c.column_name || ' ' || c.data_type || 
        CASE WHEN tc.constraint_type = 'PRIMARY KEY' THEN ' (PK)' ELSE '' END
      ) as columns
    FROM information_schema.tables t
    JOIN information_schema.columns c ON t.table_name = c.table_name
    LEFT JOIN information_schema.table_constraints tc 
      ON t.table_name = tc.table_name 
      AND tc.constraint_type = 'PRIMARY KEY'
    LEFT JOIN information_schema.constraint_column_usage ccu
      ON tc.constraint_name = ccu.constraint_name 
      AND c.column_name = ccu.column_name
    WHERE t.table_schema = 'public'
    GROUP BY t.table_name
    ORDER BY t.table_name;
  `;

  const result = await query(schemaQuery);
  return result.rows;
} 