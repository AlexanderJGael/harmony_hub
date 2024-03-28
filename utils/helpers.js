module.exports = {
  socketInit: (io, sequelize) => {
    io.on('connection', (socket) => {
      socket.on('chat message', async (msg) => {
        let result;
        try {
          result = await sequelize.models.messages.create({ content: msg });
        } catch (e) {
          console.error('Failed to insert message into the database', e);
          return;
        }
        io.emit('chat message', msg, result.lastID);
        
        if (!socket.recovered) {
          // if the connection state recovery was not successful
          try {
            const messages = await sequelize.models.messages.findAll({
              where: {
                id: {
                  [Sequelize.Op.gt]: socket.lastID || 0
                }
              }
            });
            messages.forEach((message) => {
              socket.emit('chat message', message.content, message.id);
            });
          } catch (e) {
            console.error('Failed to recover the connection state', e);
            return;
          }
        };
      });
    });

    // Additional helpers can be added here
}};