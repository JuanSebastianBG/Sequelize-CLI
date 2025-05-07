import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const ProductRating = sequelize.define('ProductRating', {}, {
  tableName: 'product_ratings',
  timestamps: true
});

ProductRating.associate = (models) => {
  ProductRating.belongsTo(models.Rating, {
    foreignKey: 'rating_id',
    as: 'rating'
  });
  ProductRating.belongsTo(models.Product, {
    foreignKey: 'product_id',
    as: 'product'
  });
};

export default ProductRating;