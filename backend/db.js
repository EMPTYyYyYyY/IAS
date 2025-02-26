const { Sequelize } = require('sequelize');

// Настройка подключения к SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Файл базы данных
});

module.exports = sequelize;