'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla roles
    await queryInterface.createTable('roles', {
      role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Crear tabla users
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      user_lastname: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      user_email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      user_alias: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      user_phone: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      user_address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      user_password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      user_image: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'role_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Crear tabla sellers
    await queryInterface.createTable('sellers', {
      seller_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      seller_balance: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Crear tabla stores
    await queryInterface.createTable('stores', {
      store_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sellers',
          key: 'seller_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      store_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      store_description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      store_address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      store_image: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Crear tabla delivery_agents
    await queryInterface.createTable('delivery_agents', {
      agent_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      agent_vehicle: {
        type: Sequelize.ENUM('moto', 'carro', 'bicicleta', 'a pie'),
        allowNull: false
      },
      agent_balance: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Crear tabla categories
    await queryInterface.createTable('categories', {
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      category_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      category_image: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Crear tabla products
    await queryInterface.createTable('products', {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      product_description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      product_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      product_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      product_image: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      product_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stores',
          key: 'store_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'category_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Crear tabla carts
    await queryInterface.createTable('carts', {
      cart_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'product_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      product_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Añadir índice único para evitar duplicados en el carrito
    await queryInterface.addConstraint('carts', {
      fields: ['user_id', 'product_id'],
      type: 'unique',
      name: 'unique_cart_item'
    });

    // Crear tabla orders
    await queryInterface.createTable('orders', {
      order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      order_status: {
        type: Sequelize.ENUM('pendiente', 'recibido'),
        defaultValue: 'pendiente'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Crear tabla order_products
    await queryInterface.createTable('order_products', {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'order_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'product_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      product_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      product_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Establecer clave primaria compuesta para order_products
    await queryInterface.addConstraint('order_products', {
      fields: ['order_id', 'product_id'],
      type: 'primary key',
      name: 'order_products_pkey'
    });

    // Crear tabla payment_details
    await queryInterface.createTable('payment_details', {
      payment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'orders',
          key: 'order_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      payu_reference: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      payment_method: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      payment_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      buyer_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      buyer_email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      buyer_document_type: {
        type: Sequelize.ENUM('CC', 'CE', 'TI', 'PPN', 'NIT', 'SSN', 'EIN'),
        allowNull: false
      },
      buyer_document_number: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      buyer_phone: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Crear tabla shipping_details
    await queryInterface.createTable('shipping_details', {
      shipping_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'orders',
          key: 'order_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      agent_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'delivery_agents',
          key: 'agent_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      shipping_address: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      shipping_start: {
        type: Sequelize.DATE,
        allowNull: true
      },
      shipping_end: {
        type: Sequelize.DATE,
        allowNull: true
      },
      shipping_cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      shipping_message: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Crear tabla shipping_history
    await queryInterface.createTable('shipping_history', {
      assignment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'order_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      shipping_status: {
        type: Sequelize.ENUM('pendiente', 'alistado', 'recogido', 'en camino', 'entregado'),
        defaultValue: 'pendiente'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Crear tabla ratings
    await queryInterface.createTable('ratings', {
      rating_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rating_comment: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      rating_image: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      rating_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Crear tabla user_ratings
    await queryInterface.createTable('user_ratings', {
      rating_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ratings',
          key: 'rating_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      rated_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Establecer clave primaria compuesta para user_ratings
    await queryInterface.addConstraint('user_ratings', {
      fields: ['rating_id', 'user_id', 'rated_user_id'],
      type: 'primary key',
      name: 'user_ratings_pkey'
    });

    // Crear tabla product_ratings
    await queryInterface.createTable('product_ratings', {
      rating_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ratings',
          key: 'rating_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'product_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Establecer clave primaria compuesta para product_ratings
    await queryInterface.addConstraint('product_ratings', {
      fields: ['rating_id', 'product_id'],
      type: 'primary key',
      name: 'product_ratings_pkey'
    });

    // Crear tabla role_requests
    await queryInterface.createTable('role_requests', {
      request_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      requested_role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'role_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      request_status: {
        type: Sequelize.ENUM('pendiente', 'aprobado', 'rechazado'),
        defaultValue: 'pendiente'
      },
      request_response: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Insertar roles iniciales
    await queryInterface.bulkInsert('roles', [
      { role_name: 'Administrador' },
      { role_name: 'Vendedor' },
      { role_name: 'Cliente' },
      { role_name: 'Repartidor' }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar tablas en orden inverso para evitar problemas de claves foráneas
    await queryInterface.dropTable('role_requests');
    await queryInterface.dropTable('product_ratings');
    await queryInterface.dropTable('user_ratings');
    await queryInterface.dropTable('ratings');
    await queryInterface.dropTable('shipping_history');
    await queryInterface.dropTable('shipping_details');
    await queryInterface.dropTable('payment_details');
    await queryInterface.dropTable('order_products');
    await queryInterface.dropTable('orders');
    await queryInterface.dropTable('carts');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('delivery_agents');
    await queryInterface.dropTable('stores');
    await queryInterface.dropTable('sellers');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('roles');
  }
};