const Messages = require('../models/Messages');
const User = require('../models/User');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

exports.createMessages = async (msg) => {
    try {
        return await Messages.create({ content: msg });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.getMessages = async () => {
    try {
    return await Messages.findAll({
        include: [{
            model: User,
            attributes: ['id', 'username']
        }],
    });
    } catch (e) {
        console.error(e);
        throw e;
    }
};

exports.getMessagesAfterId = async (id) => {
    try {
    return messages = await Messages.findAll({
        where: {
            id: {
                [Sequelize.Op.gt]: id
            }
        },
        include: [{
            model: User,
            attributes: ['id', 'username']
        }],
    })
    } catch (e) {
        console.error(e);
        throw e;
    };
};

exports.getMessagesByUser = async (userId) => {
    try {
    return await Messages.findAll({
        where: {
            userId: userId
        },
        include: [{
            model: User,
            attributes: ['id', 'username']
        }],
    });
    } catch (e) {
        console.error(e);
        throw e;
    }
};