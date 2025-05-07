import { NextResponse } from 'next/server';
import db from '../../../server/models/index.js';

// GET /api/users - Obtener todos los usuarios
export async function GET() {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ['user_password'] },
      include: [{ model: db.Role, as: 'role' }]
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/users - Crear nuevo usuario
export async function POST(request) {
  try {
    const userData = await request.json();
    const user = await db.User.create(userData);
    
    // Excluir contraseña en la respuesta
    const { user_password, ...userWithoutPassword } = user.toJSON();
    
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// PUT /api/users/:id - Actualizar usuario
export async function PUT(request) {
  try {
    const { id } = request.params;
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
export async function DELETE(request) {
  try {
    const { id } = request.params;
    
    const deleted = await db.User.destroy({
      where: { user_id: id }
    });
    
    if (!deleted) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}