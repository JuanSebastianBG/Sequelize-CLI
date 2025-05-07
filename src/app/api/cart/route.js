import { NextResponse } from 'next/server';
import db from '../../../server/models/index.js';

// GET /api/cart?userId=123 - Obtener carrito de usuario
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'Se requiere userId' }, { status: 400 });
    }
    
    const cartItems = await db.Cart.findAll({
      where: { user_id: userId },
      include: [{ model: db.Product, as: 'product' }]
    });
    
    return NextResponse.json(cartItems);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/cart - Añadir producto al carrito
export async function POST(request) {
  try {
    const { userId, productId, quantity = 1 } = await request.json();
    
    const [cartItem, created] = await db.Cart.findOrCreate({
      where: { user_id: userId, product_id: productId },
      defaults: { product_quantity: quantity }
    });
    
    if (!created) {
      cartItem.product_quantity += quantity;
      await cartItem.save();
    }
    
    return NextResponse.json(cartItem, { status: created ? 201 : 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

