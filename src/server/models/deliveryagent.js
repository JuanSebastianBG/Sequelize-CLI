import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const DeliveryAgent = sequelize.define('DeliveryAgent', {
  agent_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  agent_vehicle: {
    type: DataTypes.ENUM('moto', 'carro', 'bicicleta', 'a pie'),
    allowNull: false
  },
  agent_balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  }
}, {
  tableName: 'delivery_agents',
  timestamps: true
});

DeliveryAgent.associate = (models) => {
  DeliveryAgent.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
  DeliveryAgent.hasMany(models.ShippingDetail, {
    foreignKey: 'agent_id',
    as: 'shippingDetails'
  });
};

export default DeliveryAgent;