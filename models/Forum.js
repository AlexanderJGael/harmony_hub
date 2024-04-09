const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Forum extends Model {}

Forum.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "user",
        key: "username",
      },
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: "forum",
  }
);

module.exports = Forum;
