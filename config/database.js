const { sequelize } = require('sequelize');

const sequelize = new sequelize(process.env.DB_Name, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

module.exports = sequelize;