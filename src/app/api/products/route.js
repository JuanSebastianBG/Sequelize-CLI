import { NextResponse } from 'next/server';
import db from '@/server/models';

// GET /api/products - Obtener todos los productos
export async function GET() {
  try {
    const products = await db.Product.findAll({
      include: [
        { model: db.Category, as: 'category' },
        { model: db.Store, as: 'store', include: [{ model: db.Seller, as: 'seller' }] }
      ]
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/products - Crear nuevo producto
export async function POST(request) {
  try {
    const productData = await request.json();
    const product = await db.Product.create(productData);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// PUT /api/products/:id - Actualizar producto
export async function PUT(request) {
  try {
    const { id } = request.params;
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
export async function DELETE(request) {
  try {
    const { id } = request.params;
    
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