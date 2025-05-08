'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    product_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    product_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    product_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stores',
        key: 'store_id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'category_id'
      }
    }
  }, {
    tableName: 'products',
    timestamps: true,
    paranoid: true
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Store, {
      foreignKey: 'store_id',
      as: 'store'
    });
    Product.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category'
    });
    Product.belongsToMany(models.Cart, {
      through: 'carts',
      foreignKey: 'product_id',
      as: 'carts'
    });
    Product.belongsToMany(models.Order, {
      through: models.OrderProduct,
      foreignKey: 'product_id',
      as: 'orders'
    });
    Product.belongsToMany(models.Rating, {
      through: models.ProductRating,
      foreignKey: 'product_id',
      as: 'ratings'
    });
  };

  return Product;
};