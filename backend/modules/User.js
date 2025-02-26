const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Модель пользователя
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'patient', // Роль по умолчанию
  },
});

module.exports = User;