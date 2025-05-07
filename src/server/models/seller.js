import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const Seller = sequelize.define('Seller', {
  seller_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  seller_balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  }
}, {
  tableName: 'sellers',
  timestamps: true
});

Seller.associate = (models) => {
  Seller.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
  Seller.hasMany(models.Store, {
    foreignKey: 'seller_id',
    as: 'stores'
  });
};

export default Seller;