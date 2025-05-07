import { NextResponse } from 'next/server';
import db from '../../../server/models/index.js';
// PUT /api/cart/:id - Actualizar cantidad en carrito
export async function PUT(request, { params }) {
    try {
      const { id } = params;
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
  export async function DELETE(request, { params }) {
    try {
      const { id } = params;
      
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