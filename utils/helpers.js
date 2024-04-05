const Message = require('../models/Message');
const User = require('../models/User');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = {
  createMessage: async (msg) => {
      try {
          const message = await Message.create({ content: msg });
          return message;
      } catch (error) {
          console.error(error);
          throw error;
      }
  },
  
  getMessages: async () => {
      const messages = await Message.findAll({
          include: [{
              model: User,
              attributes: ['username']
          }],
      });
      return messages;
  },
  
  getMessagesAfterId: async (id) => {
      const messages = await Message.findAll({
          where: {
              id: {
                  [Sequelize.Op.gt]: id
              }
          },
          include: [{
              model: User,
              attributes: ['username']
          }],
      });
      return messages;
  },
  
getMessagesByUser: async (userId) => {
      const messages = await Message.findAll({
          where: {
              userId: userId
          },
          include: [{
              model: User,
              attributes: ['username']
          }],
      });
      return messages;
  },
};