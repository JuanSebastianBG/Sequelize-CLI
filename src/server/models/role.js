import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const Role = sequelize.define('Role', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'roles',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

Role.associate = (models) => {
  Role.hasMany(models.User, {
    foreignKey: 'role_id',
    as: 'users'
  });
  Role.hasMany(models.RoleRequest, {
    foreignKey: 'requested_role',
    as: 'roleRequests'
  });
};

export default Role;