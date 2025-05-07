import { NextResponse } from 'next/server';
import db from '../../../server/models/index.js';

// PUT /api/orders/:id - Actualizar estado de orden
export async function PUT(request, { params }) {
    try {
      const { id } = params;
      const { status } = await request.json();
      
      const [affectedCount] = await db.Order.update(
        { order_status: status },
        { where: { order_id: id } }
      );
      
      if (affectedCount === 0) {
        return NextResponse.json({ error: 'Orden no encontrada' }, { status: 404 });
      }
      
      // Registrar en el historial
      await db.ShippingHistory.create({
        order_id: id,
        shipping_status: status
      });
      
      return NextResponse.json({ message: 'Estado de orden actualizado' });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
  
  // DELETE /api/orders/:id - Cancelar orden
  export async function DELETE(request, { params }) {
    try {
      const { id } = params;
      
      const deleted = await db.Order.update(
        { order_status: 'cancelada' },
        { where: { order_id: id } }
      );
      
      if (!deleted) {
        return NextResponse.json({ error: 'Orden no encontrada' }, { status: 404 });
      }
      
      // Registrar cancelación en el historial
      await db.ShippingHistory.create({
        order_id: id,
        shipping_status: 'cancelada'
      });
      
      return NextResponse.json({ message: 'Orden cancelada correctamente' });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }