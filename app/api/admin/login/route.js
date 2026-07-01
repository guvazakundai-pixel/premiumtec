import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD || 'coretech-admin-2026';

  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set('admin_token', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
