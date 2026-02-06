const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Market = sequelize.define('Market', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING(255) }
}, { tableName: 'markets', timestamps: false });

module.exports = Market;
