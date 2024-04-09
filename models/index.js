const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

const User = require('./User')
const Blog = require("./Blog");
const Forum = require("./Forum");
const Messages = require("./Messages");
const Profile = require("./Profile");

const createTables = async () => {
    await User.sync();
    await Messages.sync();
    await Blog.sync();
    await Forum.sync();
    await Profile.sync();
    
    console.log("Tables have been created");
};

createTables();

User.hasMany(Messages, {
    foreignKey: "senderId",
    onDelete: "CASCADE",
});

User.hasMany(Blog, {
    foreignKey: "authorId",
    onDelete: "CASCADE",
});

User.hasMany(Forum, {
    foreignKey: "authorId",
    onDelete: "CASCADE",
});

User.hasOne(Profile, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Blog.belongsTo(User, {
    foreignKey: "authorId",
});

Forum.belongsTo(User, {
    foreignKey: "authorId",
});

Messages.belongsTo(User, {
    foreignKey: "senderId",
});

Profile.belongsTo(User, {
    foreignKey: "userId",
});

module.exports = { User, Messages, Blog, Forum, Profile };