import { NextResponse } from 'next/server';
import db from '@/server/models/index.js';

// GET /api/stores - Obtener todas las tiendas
export async function GET() {
  try {
    const stores = await db.Store.findAll({
      include: [
        { model: db.Seller, as: 'seller', include: [{ model: db.User, as: 'user' }] },
        { model: db.Product, as: 'products' }
      ]
    });
    return NextResponse.json(stores);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/stores - Crear nueva tienda
export async function POST(request) {
  try {
    const storeData = await request.json();
    const store = await db.Store.create(storeData);
    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
