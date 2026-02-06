const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Banner = sequelize.define('Banner', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  image: { type: DataTypes.STRING(255) },
  order_no: { type: DataTypes.INTEGER }
}, { tableName: 'banners', timestamps: false });

module.exports = Banner;
