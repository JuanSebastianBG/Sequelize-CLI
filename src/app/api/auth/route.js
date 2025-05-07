import { NextResponse } from 'next/server';
import db from '../../../server/models/index.js';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    const user = await db.User.findOne({ 
      where: { user_email: email },
      include: [{ model: db.Role, as: 'role' }]
    });

    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.user_password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const userData = {
      id: user.user_id,
      name: user.user_name,
      email: user.user_email,
      role: user.role.role_name
    };

    return NextResponse.json({
      message: "Inicio de sesión exitoso",
      user: userData
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}