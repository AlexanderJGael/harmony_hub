const User = require("./User"); 
const Blog = require("./blog");
const Forum = require("./forum");

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

module.exports = { User, Blog, Forum };
const User = require('./User');
const Messages = require('./message');

User.associate(Messages);
Messages.associate(User);

module.exports = { User, Messages, Blog, Forum };