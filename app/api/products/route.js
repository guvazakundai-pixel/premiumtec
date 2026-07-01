import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const products = store.getAll();
  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }
    if (!body.price || body.price < 0) {
      return NextResponse.json({ error: 'Valid price is required' }, { status: 400 });
    }
    const product = store.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
