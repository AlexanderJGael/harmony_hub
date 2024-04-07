const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      key: 'id',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
      key: 'username',
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
      afterUpdate: async (updatedUser) => {
        const { Messages } = require("./Messages");
        await Messages.update({ username: updatedUser.username }, { where: { userId: User.id}})
      },
      afterDestroy: async (destroyedUser) => {
        const { Messages } = require("./Messages");
        await Messages.destroy({ where: { userId: User.id }});
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
    id: DataTypes.UUID,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = function(models) {
    User.hasMany(models.Messages, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return User;
};

module.exports = User;
