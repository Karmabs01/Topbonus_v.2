import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const country = req.headers.get('x-vercel-ip-country') || 'all';
  
  return NextResponse.json({ country });
}
