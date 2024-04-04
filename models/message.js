const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Messages extends Model {
  static associate(models) {
    Messages.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  }
};

Messages.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.TEXT,
    client_offset: DataTypes.STRING,
    avatar: DataTypes.STRING,
    username: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  });

  Message.associate = function(models) {
    Message.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };

  return Message;
};

module.exports = Messages;