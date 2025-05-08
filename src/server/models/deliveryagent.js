'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const DeliveryAgent = sequelize.define('DeliveryAgent', {
    agent_id: {
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
    agent_vehicle: {
      type: DataTypes.ENUM('moto', 'carro', 'bicicleta', 'a pie'),
      allowNull: false
    },
    agent_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    agent_status: {
      type: DataTypes.ENUM('activo', 'inactivo', 'ocupado'),
      defaultValue: 'activo'
    },
    agent_license: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'delivery_agents',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  DeliveryAgent.associate = function(models) {
    DeliveryAgent.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    DeliveryAgent.hasMany(models.ShippingDetail, {
      foreignKey: 'agent_id',
      as: 'shippingDetails'
    });
  };

  return DeliveryAgent;
};