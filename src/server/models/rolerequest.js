'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const RoleRequest = sequelize.define('RoleRequest', {
    request_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    request_status: {
      type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'),
      defaultValue: 'pendiente'
    },
    request_response: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    requested_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'role_id'
      }
    }
  }, {
    tableName: 'role_requests',
    timestamps: true
  });

  RoleRequest.associate = function(models) {
    RoleRequest.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    RoleRequest.belongsTo(models.Role, {
      foreignKey: 'requested_role',
      as: 'requestedRole'
    });
  };

  return RoleRequest;
};