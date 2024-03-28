const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

const messages = sequelize.define('messages', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  client_offset: {
    type: DataTypes.TEXT,
    unique: true,
  },
  content: DataTypes.TEXT,
},
{
  Hooks: {
    beforeCreate: async (newMessageData) => {
      newMessageData.client_offset = await newMessageData.client_offset();
      return newMessageData;
    },
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'message',
  });

module.exports = messages;