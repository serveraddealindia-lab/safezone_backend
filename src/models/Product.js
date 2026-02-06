const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(255), allowNull: false },
  short_desc: { type: DataTypes.TEXT },
  long_desc: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING(255) },
  pdf: { type: DataTypes.STRING(255) },
  datasheet: { type: DataTypes.STRING(255) }
}, { tableName: 'products', timestamps: false });

module.exports = Product;
