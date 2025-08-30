const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type          : DataTypes.INTEGER,
    autoIncrement : true,
    primaryKey    : true,
  },
  name: {
    type      : DataTypes.STRING(60),
    allowNull : false,
  },
  email: {
    type      : DataTypes.STRING(120),
    allowNull : false,
    unique    : true,
    validate  : { isEmail: true },
  },
  passwordHash: {
    type      : DataTypes.STRING(255),
    allowNull : false,
  },
}, {
  tableName : 'users',
  timestamps: true,
});

module.exports = User;
