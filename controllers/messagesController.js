const Sequelize = require('sequelize');
const Messages = require('../models/Messages');
const User = require('../models/User');
const { Op } = require('sequelize');

exports.getChat = (req, res, next) => {
    try {
        const user = req.session.user;

        if (!req.session.logged_in) {
            return res.redirect('/login');
        }

        res.render('chat', {layout: 'main',  logged_in: req.session.logged_in, user: user });
    } catch (e) {
        console.error(e);
        return next(e);
    }
};

exports.postChat = async (req, res, next) => {
    try {
        const { content } = req.body;
        const user = await User.findOne({ where: { id: req.session.userId  } });
        const message = await Messages.create({ content, userId: req.session.userId });
        const msg = { content: message.content, username: user.username };
        res.json(msg);
    } catch (e) {
        console.error(e);
        return next(e);
    }
};

exports.createMessage = async (msg) => {
    try {
        const message = await Messages.create({ content: msg.content, userId: msg.userId, username: msg.username });

    } catch (e) {
        console.error(e);
        throw e;
    }
};

exports.returnMessages = async () => {
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

exports.getMessagesById = async (id) => {
    try {
        return await Messages.findOne({
            where: {
                id: id
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

exports.updateMessage = async (id, content) => {
    try {
        return await Messages.update({ content: content }, {
            where: {
                id: id
            }
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
};

exports.deleteMessage = async (id) => {
    try {
        return await Messages.destroy({
            where: {
                id: id
            }
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
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

exports.deleteMessagesByUser = async (userId) => {
    try {
        return await Messages.destroy({
            where: {
                userId: userId
            }
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
};

exports.getMessagesAfterId = async (id) => {
    try {
    return await Messages.findAll({
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

exports.getMessages = async (req, res, next) => {
    try {
        const messages = await Messages.findAll({
            include: [{
                model: User,
                attributes: ['id', 'username']
            }],
        });
        res.json(messages);
    } catch (e) {
        console.error(e);
        return next(e);
    }
};

exports.postMessages = async (req, res, next) => {
    try {
        const { content } = req.body;
        const user = await User.findOne({ where: { id: req.session.userId } });
        const newMessage = await Messages.create({ content, userId: req.session.userId });
        res.json(newMessage);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
};