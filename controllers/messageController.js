const Message = require('../models/Message');
const User = require('../models/User');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

exports.createMessage = async (msg) => {
    try {
        const message = await Message.create({ content: msg });
        return message;
    } catch (error) {
        console.error(error);
        throw error;
    }
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

exports.getMessagesByUser = async (userId) => {
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
};