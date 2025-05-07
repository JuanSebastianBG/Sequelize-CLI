import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const ShippingDetail = sequelize.define('ShippingDetail', {
  shipping_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  shipping_address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  shipping_start: {
    type: DataTypes.DATE,
    allowNull: true
  },
  shipping_end: {
    type: DataTypes.DATE,
    allowNull: true
  },
  shipping_cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  shipping_message: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'shipping_details',
  timestamps: true
});

ShippingDetail.associate = (models) => {
  ShippingDetail.belongsTo(models.Order, {
    foreignKey: 'order_id',
    as: 'order'
  });
  ShippingDetail.belongsTo(models.DeliveryAgent, {
    foreignKey: 'agent_id',
    as: 'agent'
  });
};

export default ShippingDetail;