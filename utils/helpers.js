const { Messages } = require('../models/');
const User = require('../models/User');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = {
  createMessages: async (msg) => {
      try {
          const messages = await Messages.create({ content: msg });
          return messages;
      } catch (error) {
          console.error(error);
          throw error;
      }
  },
  
  getMessages: async () => {
      const messages = await Messages.findAll({
          include: [{
              model: User,
              attributes: ['username', 'id']
          }],
      });
      return messages;
  },
  
  getMessagesAfterId: async (id) => {
      const messages = await Messages.findAll({
          where: {
              id: {
                  [Sequelize.Op.gt]: id
              }
          },
          include: [{
              model: User,
              attributes: ['id', 'username']
          }],
      });
      return messages;
  },
  
getMessagesByUser: async (userId) => {
      const messages = await Messages.findAll({
          where: {
              userId: userId
          },
          include: [{
              model: User,
              attributes: ['id'],
          }],
      });
      return messages;
  },
};