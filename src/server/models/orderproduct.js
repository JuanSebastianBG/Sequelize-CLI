'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    product_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'product_id'
      }
    }
  }, {
    tableName: 'order_products',
    timestamps: true
  });

  OrderProduct.associate = function(models) {
    OrderProduct.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order'
    });
    OrderProduct.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };

  return OrderProduct;
};