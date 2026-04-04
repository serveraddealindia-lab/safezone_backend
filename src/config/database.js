require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'fire_safety_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      decimalNumbers: true,
      dateStrings: true,
      typeCast: true,
      // Add SSL support for remote connections (required by many cloud DB providers)
      ssl: process.env.NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    define: {
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    // Add retry logic for connection failures
    retry: {
      max: 3,
      timeout: 30000
    }
  }
);

module.exports = sequelize;
