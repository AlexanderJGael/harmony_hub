const { Sequelize } = require('sequelize');
const { Messages } = require('../models/Messages');
const { User } = require('../models/User');

const sequelize = new Sequelize(process.env.DB_Name, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

// Sync the models with the database
sequelize.sync()

// Export the models
module.exports = { sequelize, Messages, User };