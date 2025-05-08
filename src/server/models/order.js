'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_status: {
      type: DataTypes.ENUM('pendiente', 'recibido'),
      defaultValue: 'pendiente'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    tableName: 'orders',
    timestamps: true
  });

  Order.associate = function(models) {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Order.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: 'order_id',
      as: 'products'
    });
    Order.hasOne(models.PaymentDetail, {
      foreignKey: 'order_id',
      as: 'paymentDetail'
    });
    Order.hasOne(models.ShippingDetail, {
      foreignKey: 'order_id',
      as: 'shippingDetail'
    });
    Order.hasMany(models.ShippingHistory, {
      foreignKey: 'order_id',
      as: 'shippingHistory'
    });
  };

  return Order;
};