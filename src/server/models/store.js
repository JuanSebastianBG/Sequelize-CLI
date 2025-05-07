import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const Store = sequelize.define('Store', {
  store_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  store_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  store_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  store_address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  store_image: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'stores',
  timestamps: true
});

Store.associate = (models) => {
  Store.belongsTo(models.Seller, {
    foreignKey: 'seller_id',
    as: 'seller'
  });
  Store.hasMany(models.Product, {
    foreignKey: 'store_id',
    as: 'products'
  });
};

export default Store;