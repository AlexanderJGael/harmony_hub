const Message = require('../models/message');
const { Sequelize } = require('sequelize');

exports.createMessage = async (msg) => {
    const message = await Message.create({ content: msg });
    return message;
};

exports.getMessagesAfterId = async (id) => {
    const messages = await Message.findAll({
        where: {
            id: {
                [Sequelize.Op.gt]: id
            }
        }
    });
    return messages;
};