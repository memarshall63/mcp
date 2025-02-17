import { mcpServer } from '../../../lib/mcp-server';
import { WebSocketServerTransport } from "@modelcontextprotocol/sdk/dist/server";
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const transport = new WebSocketServerTransport();
  
  // Set headers for SSE
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  transport.onmessage = (message) => {
    writer.write(encoder.encode(`data: ${JSON.stringify(message)}\n\n`));
  };

  await mcpServer.connect(transport);

  return new Response(stream.readable, { headers });
}

export async function POST(req: NextRequest) {
  // Handle incoming messages from the client
  const body = await req.json();
  // You'll need to implement message routing to the correct transport
  // This is a simplified example
  return new Response('Message received', { status: 202 });
} 