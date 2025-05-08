'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    category_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'categories',
    timestamps: true
  });

  Category.associate = function(models) {
    Category.hasMany(models.Product, {
      foreignKey: 'category_id',
      as: 'products'
    });
  };

  return Category;
};