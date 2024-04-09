const { Messages, User } = require('../models');
const { messagesController } = require('./');
const { Op } = require('sequelize');


const socketController = (io) => {
    io.on('connection', async (socket) => {
        const session = socket.request.session;
        
        socket.on('chat message', async (message, clientOffset, callback) => {
            if (!session.logged_in) {
                socket.emit('chat message', 'You must be logged in to send messages');
                return;
            };
            
            let newMessage;
            try {
                const user = await session.user;

                newMessage = await Messages.create({ content: message, clientOffset: clientOffset, userId: user.id, username: user.username });
            } catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    callback();
                } else {
                }
                return;
            }
            socket.broadcast.emit('chat message', newMessage, newMessage.id);
            callback();
            })
  
        if (!socket.recovered) {
        try {
            const messages = await Messages.findAll({
            where: {
                id: {
                [Op.gt]: socket.handshake.auth.serverOffset || 0
                }
            },
            });

            messages.forEach(message => {
            socket.emit('chat message', message, message.id);
                })
            } catch (e) {
            console.error(e);
            }
        }
    });
};

module.exports = socketController;
