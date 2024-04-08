const sequelize = require('../config/connection');
const { User, Forum, Blog, Messages, Profile } = require('../models');
const userData = require("./userData.json");

const seedDatabase = async (userData) => {
  await sequelize.sync();

    await User.bulkCreate(userData, {
      updateOnDuplicate: ["username", "id"],
      individualHooks: true,
      returning: true,
    });
    process.exit(0);
  };

seedDatabase(userData);