'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ShippingHistory = sequelize.define('ShippingHistory', {
    assignment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    shipping_status: {
      type: DataTypes.ENUM('pendiente', 'alistado', 'recogido', 'en camino', 'entregado'),
      defaultValue: 'pendiente'
    }
  }, {
    tableName: 'shipping_history',
    timestamps: true,
    underscored: true
  });

  ShippingHistory.associate = function(models) {
    ShippingHistory.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order'
    });
  };

  return ShippingHistory;
};