const sequelize = require('../config/connection');
const { User, Messages, Profile, Forum, Blog } = require('../models');
const userData = require("./userData.json");
const forumData = require("./forumData.json");
const blogData = require("./blogData.json");

const seedDatabase = async (userData, forumData, blogData) => {
    await User.sync();
    await Messages.sync();
    await Blog.sync();
    await Forum.sync();
    await Profile.sync();


    await User.bulkCreate(userData, {
      updateOnDuplicate: ["username", "id"],
      individualHooks: true,
      returning: true,
    });

    console.log("Seeding complete!");
    process.exit(0);
  };

seedDatabase(userData, forumData, blogData);