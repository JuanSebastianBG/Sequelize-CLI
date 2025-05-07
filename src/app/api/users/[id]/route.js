import { NextResponse } from 'next/server';
import db from '@/server/models/index.js';

// PUT /api/users/:id - Actualizar usuario
export async function PUT(request,{params}) {
  try {
    const { id } = params;
    const updateData = await request.json();
    
    const [affectedCount] = await db.User.update(updateData, {
      where: { user_id: id }
    });
    
    if (affectedCount === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
    
    const updatedUser = await db.User.findByPk(id, {
      attributes: { exclude: ['user_password'] }
    });
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE /api/users/:id - Eliminar usuario (soft delete)
export async function DELETE(request, { params }) {
  try {
    const { id } = params; // ✅ Correcto

    const deleted = await db.User.destroy({
      where: { user_id: id }
    });

    if (!deleted) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Usuario eliminado correctamente' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}