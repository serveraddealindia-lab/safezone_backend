const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'product_categories',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  short_desc: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  long_desc: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  pdf: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  datasheet: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;

