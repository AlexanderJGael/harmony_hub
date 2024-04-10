const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Messages extends Model {}

Messages.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    username: {
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'username',
      }, 
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    clientOffset: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: 'messages',
  }
);

module.exports = Messages;