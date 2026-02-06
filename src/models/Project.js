const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  location: { type: DataTypes.STRING(255), allowNull: false },
  country: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING(255) },
  year: { type: DataTypes.INTEGER },
  status: { type: DataTypes.ENUM('completed', 'ongoing', 'planned'), defaultValue: 'completed' },
  category: { type: DataTypes.STRING(100) }
}, { tableName: 'projects', timestamps: true, underscored: true });

module.exports = Project;
