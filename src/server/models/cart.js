import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const Cart = sequelize.define('Cart', {
  cart_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'carts',
  timestamps: true
});

Cart.associate = (models) => {
  Cart.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
  Cart.belongsTo(models.Product, {
    foreignKey: 'product_id',
    as: 'product'
  });
};

export default Cart;