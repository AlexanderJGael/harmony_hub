const sequelize = require('../config/connection');
const { User, Messages, Profile, Forum, Blog } = require('../models');
const userData = require("./userData.json");
const forumData = require("./forumData.json");
const blogData = require("./blogData.json");
const { Sequelize } = require('sequelize');

const seedDatabase = async (userData, forumData, blogData) => {
    await sequelize.sync({ force: false })

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
        const author = await User.findOne({ where: { username: forum.authorName } });
        await Forum.create({
          ...forum,
          authorId: author.id
        });
      } catch (e) {
        if (e.name !== 'SequelizeUniqueConstraintError') {
          throw e;
        }
      }
    }

    for (const blog of blogData) {
      try {
        const author = await User.findOne({ where: { username: blog.authorName } });
        await Blog.create({
          ...blog,
          authorId: author.id
        });
      } catch (e) {
        if (e.name !== 'SequelizeUniqueConstraintError') {
          throw e;
        }
      }
    }

    for (const profile of profileData) {
      try {
        const user = await User.findOne({ where: { username: profile.username } });
        await Profile.create({
          ...profile,
          userId: user.id,
        });
      } catch (e) {
        if (e.name !== 'SequelizeUniqueConstraintError') {
          throw e;
        }
      }
    }

    for (const message of messageData) {
      try {
        const sender = await User.findOne({ where: { username: message.senderName } });
        await Messages.create({
          ...message,
          userId: sender.id
        });
      } catch (e) {
        if (e.name !== 'SequelizeUniqueConstraintError') {
          throw e;
        }
      }
    }

    console.log("Seeding complete!");
    process.exit(0);
  };

seedDatabase(userData, forumData, blogData);