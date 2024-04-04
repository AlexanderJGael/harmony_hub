const Message = require('../models/message');
const User = require('../models/User');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

exports.createMessage = async (msg, userID) => {
    const message = await Message.create({ content: msg, user_id: userID });
    return message;
};

exports.getMessages = async () => {
    const messages = await Message.findAll({
        include: [{
            model: User,
            attributes: ['username']
        }],
    });
    return messages;
};

exports.getMessagesAfterId = async (id) => {
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
};