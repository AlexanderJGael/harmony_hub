const User = require("./User"); 
const Blog = require("./blog");
const Forum = require("./forum");
const Messages = require("./message");

User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Forum, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Forum.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Messages, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Messages.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Messages, Blog, Forum };