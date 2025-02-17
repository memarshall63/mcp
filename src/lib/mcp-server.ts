import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { getSchemaInfo } from './schema';

export const mcpServer = new McpServer({
  name: "Database Explorer",
  version: "1.0.0"
});

// Register the schema resource
mcpServer.resource(
  "schema",
  "schema://database",
  async (uri) => {
    try {
      const schemaData = await getSchemaInfo();
      
      // Format the schema data as a readable text representation
      const schemaText = schemaData.map(table => {
        const columns = table.columns.join('\n  ');
        return `Table: ${table.table_name}\n  ${columns}`;
      }).join('\n\n');

      return {
        contents: [{
          uri: uri.href,
          text: schemaText
        }]
      };
    } catch (error) {
      console.error('Error fetching schema:', error);
      throw error;
    }
  }
); 