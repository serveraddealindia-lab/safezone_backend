const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Banner = sequelize.define('Banner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  subtitle: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  link: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  order_no: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'active'
  }
}, {
  tableName: 'banners',
  timestamps: false
});

module.exports = Banner;

