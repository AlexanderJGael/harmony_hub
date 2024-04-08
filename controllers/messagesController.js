const Messages = require('../models/Messages');
const User = require('../models/User');

exports.chatGet = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.session.userId } });

        if (req.session.logged_in) {
            return res.redirect('/login');
        }

        res.render('chat', { logged_in: req.session.logged_in, username: user.username});
    } catch (e) {
        console.error(e);
        return next(e);
    }
};

exports.chatPost = async (req, res, next) => {
    try {
        const { content } = req.body;
        const user = await User.findOne({ where: { id: req.session.userId } });

        if (!req.session.logged_in) {
            return res.redirect('/login');
        }

        const newMessage = await Messages.create({ content, userId: user.id, userName: user.username });
        res.json(newMessage);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
};

exports.createMessage = async (msg) => {
    try {
        return await Messages.create(msg);
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