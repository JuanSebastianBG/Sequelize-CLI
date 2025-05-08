'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('Seller', {
    seller_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    seller_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
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
    tableName: 'sellers',
    timestamps: true
  });

  Seller.associate = function(models) {
    Seller.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Seller.hasMany(models.Store, {
      foreignKey: 'seller_id',
      as: 'stores'
    });
  };

  return Seller;
};