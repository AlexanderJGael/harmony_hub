const sequelize = require('../config/connection');
const { User, Messages, Profile, Forum, Blog } = require('../models');
const userData = require("./userData.json");
const forumData = require("./forumData.json");
const blogData = require("./blogData.json");
const profileData = require("./profileData.json");
const messageData = require("./messageData.json");
const { Sequelize } = require('sequelize');

const seedDatabase = async (userData, forumData, blogData, profileData, messageData) => {
    await sequelize.sync({ force: true })

    for (const user of userData) {
      try {
        await User.create(user);
      } catch (e) {
        if (e.name !== 'SequelizeUniqueConstraintError') {
          throw e;
        }
      }
    }

    for (const forum of forumData) {
      try {
        const forumId = await User.findOne({ where: { username: forum.authorName } });
        await Forum.create({ ...forum, authorId: forumId.id });
      } catch (e) {
        if (e.name !== 'SequelizeUniqueConstraintError') {
          throw e;
        }
      }
    }

    for (const blog of blogData) {
      try {
        const blogId = await User.findOne({ where: { username: blog.authorName } });
        await Blog.create({ ...blog, authorId: blogId.id });
      } catch (e) {
        if (e.name !== 'SequelizeUniqueConstraintError') {
          throw e;
        }
      }
    }

    for (const profile of profileData) {
      try {
        const profileId = await User.findOne({ where: { username: profile.username } });
        await Profile.create({ ...profile, userId: profileId.id });
      } catch (e) {
        if (e.name !== 'SequelizeUniqueConstraintError') {
          throw e;
        }
      }
    }

    for (const message of messageData) {
      try {
        const messageId = await User.findOne({ where: { username: message.username } });
        await Messages.create({ ...message, userId: messageId.id });
      } catch (e) {
        if (e.name !== 'SequelizeUniqueConstraintError') {
          throw e;
        }
      }
    }

    console.log("Seeding complete!");
    process.exit(0);
  };

seedDatabase(userData, forumData, blogData, profileData, messageData);