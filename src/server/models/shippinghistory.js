import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

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
  timestamps: true
});

ShippingHistory.associate = (models) => {
  ShippingHistory.belongsTo(models.Order, {
    foreignKey: 'order_id',
    as: 'order'
  });
};

export default ShippingHistory;