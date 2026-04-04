require("dotenv").config();
const { Sequelize } = require("sequelize");

const config = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "3306",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "fire_safety_db",
  dialect: "mysql",
  logging: false, // Disable raw SQL logging
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
};

const sequelize = new Sequelize(config);

module.exports = sequelize;
