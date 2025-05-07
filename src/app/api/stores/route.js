import { NextResponse } from 'next/server';
import db from '@/server/models';

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

// PUT /api/stores/:id - Actualizar tienda
export async function PUT(request) {
  try {
    const { id } = request.params;
    const updateData = await request.json();
    
    const [affectedCount] = await db.Store.update(updateData, {
      where: { store_id: id }
    });
    
    if (affectedCount === 0) {
      return NextResponse.json({ error: 'Tienda no encontrada' }, { status: 404 });
    }
    
    const updatedStore = await db.Store.findByPk(id, {
      include: [{ model: db.Seller, as: 'seller' }]
    });
    return NextResponse.json(updatedStore);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE /api/stores/:id - Eliminar tienda
export async function DELETE(request) {
  try {
    const { id } = request.params;
    
    // Verificar si hay productos asociados
    const productsCount = await db.Product.count({
      where: { store_id: id }
    });
    
    if (productsCount > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar, hay productos asociados' },
        { status: 400 }
      );
    }
    
    const deleted = await db.Store.destroy({
      where: { store_id: id }
    });
    
    if (!deleted) {
      return NextResponse.json({ error: 'Tienda no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Tienda eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}