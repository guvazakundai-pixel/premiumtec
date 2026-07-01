import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { id } = await params;
  const product = store.getById(Number(id));
  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const product = store.update(Number(id), body);
    if (!product) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const deleted = store.delete(Number(id));
  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
