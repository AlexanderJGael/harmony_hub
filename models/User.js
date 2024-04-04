const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  async checkPassword(loginPw) {
    return await bcrypt.compare(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUser) => {
        if (updatedUser.changed("password")) {
          updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
        }
        return updatedUser;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: "user",
  }
);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: DataTypes.INTERGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = function(models) {
    User.hasMany(models.Message, {
      foreignKey: "userId",
    });
  };

  return User;
}

module.exports = User;
