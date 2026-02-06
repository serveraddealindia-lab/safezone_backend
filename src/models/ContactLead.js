const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactLead = sequelize.define('ContactLead', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false },
  phone: { type: DataTypes.STRING(50) },
  subject: { type: DataTypes.STRING(255), allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM('new', 'contacted', 'resolved'), defaultValue: 'new' }
}, { tableName: 'contact_leads', timestamps: true, underscored: true });

module.exports = ContactLead;
