import { NextResponse } from 'next/server';
import db from '@/server/models';

// GET /api/orders - Obtener todas las órdenes
export async function GET() {
  try {
    const orders = await db.Order.findAll({
      include: [
        { model: db.User, as: 'user' },
        { 
          model: db.Product, 
          as: 'products',
          through: { attributes: ['product_quantity', 'product_price'] }
        },
        { model: db.PaymentDetail, as: 'paymentDetail' },
        { model: db.ShippingDetail, as: 'shippingDetail' }
      ]
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/orders - Crear nueva orden
export async function POST(request) {
  try {
    const { userId, products, payment, shipping } = await request.json();
    
    // Crear la orden
    const order = await db.Order.create({ user_id: userId });
    
    // Añadir productos a la orden
    const orderProducts = products.map(product => ({
      order_id: order.order_id,
      product_id: product.id,
      product_quantity: product.quantity,
      product_price: product.price
    }));
    await db.OrderProduct.bulkCreate(orderProducts);
    
    // Crear detalles de pago
    if (payment) {
      await db.PaymentDetail.create({
        order_id: order.order_id,
        ...payment
      });
    }
    
    // Crear detalles de envío
    if (shipping) {
      await db.ShippingDetail.create({
        order_id: order.order_id,
        ...shipping
      });
    }
    
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// PUT /api/orders/:id - Actualizar estado de orden
export async function PUT(request) {
  try {
    const { id } = request.params;
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
export async function DELETE(request) {
  try {
    const { id } = request.params;
    
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