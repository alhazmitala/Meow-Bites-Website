const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
  id: {
    type          : DataTypes.INTEGER,
    autoIncrement : true,
    primaryKey    : true,
  },
  name: {
    type      : DataTypes.STRING(100),
    allowNull : false,
  },
  description: {
    type      : DataTypes.TEXT,
    allowNull : true,
  },
  price: {
    type      : DataTypes.DECIMAL(10, 2),
    allowNull : false,
  },
  imageUrl: {
    type      : DataTypes.STRING(255),
    allowNull : true,
  },
}, {
  tableName : 'products',
  timestamps: true,
});

module.exports = Product;
