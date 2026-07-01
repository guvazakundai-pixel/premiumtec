import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (token?.value === 'authenticated') {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
