const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Feedback = sequelize.define('Feedback', {
  id: {
    type         : DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey   : true,
  },
  name: {
    type     : DataTypes.STRING(60),
    allowNull: false,
  },
  email: {
    type     : DataTypes.STRING(120),
    allowNull: false,
    validate : { isEmail: true },
  },
  subject: {
    type     : DataTypes.STRING(120),
    allowNull: false,
  },
  message: {
    type     : DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName : 'feedback',
  timestamps: true,
});

module.exports = Feedback;
