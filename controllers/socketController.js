const { Messages, User } = require('../models');
const { messagesController } = require('./');
const { Op } = require('sequelize');


const socketController = (io) => {
    io.on('connection', async (socket) => {
        const session = socket.request.session;
        
        socket.on('chat message', async (message) => {
            if (!session.logged_in) {
                socket.emit('chat message', 'You must be logged in to send messages');
                return;
            };

            try {
                const user = await socket.session.user;
                const messageData = await Messages.create({ content: msg, userId: user.id, username: user.username });
                const newMessage = { content: messageData.content, id: messageData.id, username: messageData.username }; 

                // Only broadcast the most recently created message
                socket.broadcast.emit('chat message', (newMessage));
                console.log('Message created');
            } catch (e) {
            console.error(e);
            socket.emit('chat message', 'An error occurred while creating the message');
            return;
            }
        })
  
    if (!socket.recovered) {
      // if the connection state recovery was not successful
      try {
      const messages = await Messages.findAll({ where: { id: { [Op.gt]: 0 } } });

      messages.forEach(message => {
        const newMessage = { content: message.content, id: message.id, username: message.username };
        socket.broadcast.emit('chat message', newMessage);
      });
      } catch (e) {
        console.error(e);
        socket.emit('chat message', 'An error occurred while fetching the chat log');
      }
    };
  });
};

module.exports = socketController;
