import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const UserRating = sequelize.define('UserRating', {}, {
  tableName: 'user_ratings',
  timestamps: true
});

UserRating.associate = (models) => {
  UserRating.belongsTo(models.Rating, {
    foreignKey: 'rating_id',
    as: 'rating'
  });
  UserRating.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'rater'
  });
  UserRating.belongsTo(models.User, {
    foreignKey: 'rated_user_id',
    as: 'ratedUser'
  });
};

export default UserRating;