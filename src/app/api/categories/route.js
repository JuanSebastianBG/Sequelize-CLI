import { NextResponse } from 'next/server';
import db from '@/server/models';

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

// PUT /api/categories/:id - Actualizar categoría
export async function PUT(request) {
  try {
    const { id } = request.params;
    const updateData = await request.json();
    
    const [affectedCount] = await db.Category.update(updateData, {
      where: { category_id: id }
    });
    
    if (affectedCount === 0) {
      return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 });
    }
    
    const updatedCategory = await db.Category.findByPk(id);
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE /api/categories/:id - Eliminar categoría
export async function DELETE(request) {
  try {
    const { id } = request.params;
    
    // Verificar si hay productos asociados
    const productsCount = await db.Product.count({
      where: { category_id: id }
    });
    
    if (productsCount > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar, hay productos asociados' },
        { status: 400 }
      );
    }
    
    const deleted = await db.Category.destroy({
      where: { category_id: id }
    });
    
    if (!deleted) {
      return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}