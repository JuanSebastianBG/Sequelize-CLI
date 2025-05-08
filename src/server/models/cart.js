'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1
      }
    },
    added_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'carts',
    timestamps: true,
    underscored: true,
    createdAt: 'added_at',
    updatedAt: false
  });

  Cart.associate = function(models) {
    Cart.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Cart.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };

  return Cart;
};