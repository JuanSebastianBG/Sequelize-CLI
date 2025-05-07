import { NextResponse } from 'next/server';
import db from '../../../server/models/index.js';

// GET /api/categories - Obtener todas las categorías
export async function GET() {
  try {
    const categories = await db.Category.findAll({
      include: [{
        model: db.Product,
        as: 'products', 
        attributes: ['product_id', 'product_name', 'product_price']
      }]
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/categories - Crear nueva categoría
export async function POST(request) {
  try {
    const categoryData = await request.json();
    const category = await db.Category.create(categoryData);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

