import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../sequelize';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  user_lastname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  user_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  user_alias: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  user_phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  user_address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  user_password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  user_image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'roles',
      key: 'role_id'
    }
  }
}, {
  tableName: 'users',
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.user_password) {
        const salt = await bcrypt.genSalt(10);
        user.user_password = await bcrypt.hash(user.user_password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('user_password')) {
        const salt = await bcrypt.genSalt(10);
        user.user_password = await bcrypt.hash(user.user_password, salt);
      }
    }
  }
});

User.associate = (models) => {
  User.belongsTo(models.Role, {
    foreignKey: 'role_id',
    as: 'role'
  });
  User.hasOne(models.Seller, {
    foreignKey: 'user_id',
    as: 'seller'
  });
  User.hasOne(models.DeliveryAgent, {
    foreignKey: 'user_id',
    as: 'deliveryAgent'
  });
  User.hasMany(models.Cart, {
    foreignKey: 'user_id',
    as: 'carts'
  });
  User.hasMany(models.Order, {
    foreignKey: 'user_id',
    as: 'orders'
  });
  User.belongsToMany(models.Rating, {
    through: models.UserRating,
    foreignKey: 'user_id',
    as: 'givenRatings'
  });
  User.belongsToMany(models.User, {
    through: models.UserRating,
    foreignKey: 'rated_user_id',
    as: 'receivedRatings'
  });
  User.hasMany(models.RoleRequest, {
    foreignKey: 'user_id',
    as: 'roleRequests'
  });
};

User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.user_password);
};

export default User;