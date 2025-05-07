import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const OrderProduct = sequelize.define('OrderProduct', {
  product_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  product_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'order_products',
  timestamps: true
});

OrderProduct.associate = (models) => {
  OrderProduct.belongsTo(models.Order, {
    foreignKey: 'order_id',
    as: 'order'
  });
  OrderProduct.belongsTo(models.Product, {
    foreignKey: 'product_id',
    as: 'product'
  });
};

export default OrderProduct;