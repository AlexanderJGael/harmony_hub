const Message = require('../models/message');
const User = require('../models/User');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

exports.createMessage = async (req, res) => {
    try {
        const message = await Message.create({
            content: req.body.content,
            client_offset: req.body.client_offset,
            avatar: req.body.avatar,
            username: req.body.username,
            userId: req.body.userId // assuming the userId is sent in the request body
        });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
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