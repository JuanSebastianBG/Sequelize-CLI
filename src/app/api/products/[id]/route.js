import { NextResponse } from 'next/server';
import db from '@/server/models/index.js';
// PUT /api/products/:id - Actualizar producto
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updateData = await request.json();
    
    const [affectedCount] = await db.Product.update(updateData, {
      where: { product_id: id }
    });
    
    if (affectedCount === 0) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }
    
    const updatedProduct = await db.Product.findByPk(id);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE /api/products/:id - Eliminar producto (soft delete)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const deleted = await db.Product.destroy({
      where: { product_id: id }
    });
    
    if (!deleted) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}