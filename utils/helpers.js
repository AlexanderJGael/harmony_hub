module.exports = {
/*   socketInit: (io, sequelize) => {
    io.on('connection', (socket) => {
      socket.on('chat message', async (msg) => {
        let result;
        try {
          result = await Messages.create({ content: msg });
        } catch (e) {
          console.error('Failed to insert message into the database', e);
          return;
        }
        io.emit('chat message', msg, result.id);
        
        if (!socket.recovered) {
          // if the connection state recovery was not successful
          try {
            const messages = await Messages.findAll({
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
    }); */
    // Additional helpers can be added here
};