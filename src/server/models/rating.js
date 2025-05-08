'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rating_comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rating_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rating_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    tableName: 'ratings',
    timestamps: true,
    paranoid: true
  });

  Rating.associate = function(models) {
    Rating.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Rating.belongsToMany(models.User, {
      through: models.UserRating,
      foreignKey: 'rating_id',
      as: 'ratedUsers'
    });
    Rating.belongsToMany(models.Product, {
      through: models.ProductRating,
      foreignKey: 'rating_id',
      as: 'ratedProducts'
    });
  };

  return Rating;
};