import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    time: new Date().toISOString() 
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return new Response('Message received', { status: 202 });
} 