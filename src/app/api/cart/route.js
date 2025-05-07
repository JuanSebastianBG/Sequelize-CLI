import { NextResponse } from 'next/server';
import db from '@/server/models';

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

// PUT /api/cart/:id - Actualizar cantidad en carrito
export async function PUT(request) {
  try {
    const { id } = request.params;
    const { quantity } = await request.json();
    
    const cartItem = await db.Cart.findByPk(id);
    
    if (!cartItem) {
      return NextResponse.json({ error: 'Ítem no encontrado' }, { status: 404 });
    }
    
    cartItem.product_quantity = quantity;
    await cartItem.save();
    
    return NextResponse.json(cartItem);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE /api/cart/:id - Eliminar ítem del carrito
export async function DELETE(request) {
  try {
    const { id } = request.params;
    
    const deleted = await db.Cart.destroy({
      where: { cart_id: id }
    });
    
    if (!deleted) {
      return NextResponse.json({ error: 'Ítem no encontrado' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Ítem eliminado del carrito' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}