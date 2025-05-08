'use strict';

module.exports = (sequelize, DataTypes) => {
  const PaymentDetail = sequelize.define('PaymentDetail', {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    payu_reference: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    payment_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    buyer_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    buyer_email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    buyer_document_type: {
      type: DataTypes.ENUM('CC', 'CE', 'TI', 'PPN', 'NIT', 'SSN', 'EIN'),
      allowNull: false
    },
    buyer_document_number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    buyer_phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    }
  }, {
    tableName: 'payment_details',
    timestamps: true
  });

  PaymentDetail.associate = function(models) {
    PaymentDetail.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order'
    });
  };

  return PaymentDetail;
};