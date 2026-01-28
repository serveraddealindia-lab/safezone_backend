const sequelize = require('../config/database');
const ProductCategory = require('./ProductCategory');
const Product = require('./Product');
const Market = require('./Market');
const Service = require('./Service');
const Banner = require('./Banner');
const User = require('./User');
const Career = require('./Career');
const ContactLead = require('./ContactLead');
const Project = require('./Project');

// Define associations
Product.belongsTo(ProductCategory, {
  foreignKey: 'category_id',
  as: 'category'
});

ProductCategory.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products'
});

module.exports = {
  sequelize,
  ProductCategory,
  Product,
  Market,
  Service,
  Banner,
  User,
  Career,
  ContactLead,
  Project
};

