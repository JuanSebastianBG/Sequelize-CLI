import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

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
  }
}, {
  tableName: 'role_requests',
  timestamps: true
});

RoleRequest.associate = (models) => {
  RoleRequest.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
  RoleRequest.belongsTo(models.Role, {
    foreignKey: 'requested_role',
    as: 'requestedRole'
  });
};

export default RoleRequest;