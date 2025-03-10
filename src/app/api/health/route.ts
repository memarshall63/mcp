import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: "Success",
    time: new Date().toISOString() 
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return new Response('Message received', { status: 202 });
} 