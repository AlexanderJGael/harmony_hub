const sequelize = require('../config/connection');
const { User, Messages, Profile, Forum, Blog } = require('../models');
const userData = require("./userData.json");
const forumData = require("./forumData.json");
const blogData = require("./blogData.json");

const seedDatabase = async (userData, forumData, blogData) => {
    await sequelize.sync();

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    console.log("Seeding complete!");
    process.exit(0);
  };

seedDatabase(userData, forumData, blogData);