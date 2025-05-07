import { NextResponse } from 'next/server';

// Configuración CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  return NextResponse.json({
    message: "Express-Sale API",
    version: "1.0",
    endpoints: {
      auth: {
        login: "POST /api/auth",
        register: "POST /api/users"
      },
      users: {
        list: "GET /api/users",
        create: "POST /api/users",
        detail: "GET /api/users/[id]",
        update: "PUT /api/users/[id]",
        delete: "DELETE /api/users/[id]"
      },
      products: {
        list: "GET /api/products",
        create: "POST /api/products",
        detail: "GET /api/products/[id]",
        update: "PUT /api/products/[id]",
        delete: "DELETE /api/products/[id]"
      },
      categories: {
        list: "GET /api/categories",
        create: "POST /api/categories",
        detail: "GET /api/categories/[id]",
        update: "PUT /api/categories/[id]",
        delete: "DELETE /api/categories/[id]"
      },
      orders: {
        list: "GET /api/orders",
        create: "POST /api/orders",
        detail: "GET /api/orders/[id]",
        update: "PUT /api/orders/[id]",
        cancel: "DELETE /api/orders/[id]"
      },
      cart: {
        get: "GET /api/cart?userId=[id]",
        add: "POST /api/cart",
        update: "PUT /api/cart/[id]",
        remove: "DELETE /api/cart/[id]"
      },
      stores: {
        list: "GET /api/stores",
        create: "POST /api/stores",
        detail: "GET /api/stores/[id]",
        update: "PUT /api/stores/[id]",
        delete: "DELETE /api/stores/[id]"
      }
    }
  }, { headers: corsHeaders });
}