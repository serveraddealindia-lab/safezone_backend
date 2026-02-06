const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Career = sequelize.define('Career', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  location: { type: DataTypes.STRING(255), allowNull: false },
  type: { type: DataTypes.STRING(100), allowNull: false },
  department: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT },
  requirements: { type: DataTypes.TEXT },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'careers', timestamps: true, underscored: true });

module.exports = Career;
