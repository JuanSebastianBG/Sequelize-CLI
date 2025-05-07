import { NextResponse } from 'next/server';
import db from '@/server/models/index.js';

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
