const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");

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
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
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

module.exports = async (sequelize, DataTypes) => {
  const Forum = sequelize.define('Forum', {
    id: DataTypes.UUID,
    content: DataTypes.TEXT,
    authorId: DataTypes.UUID,
    createdAt: DataTypes.DATE,
  });

  Forum.associate = function(models) {
    Forum.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    })
  };
}

module.exports = Forum;
