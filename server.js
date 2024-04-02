const path = require('path');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const userRoutes = require('./routes/userRoutes');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { DataTypes } = require('sequelize');
const { Model, Sequelize } = require('sequelize');
const { Messages, User } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  console.log(sequelize.models);
  console.log('Database synced');
})
.catch((e) => {
  console.error('Failed to start the server', e);
});

const main = async () => {
  const Messages = sequelize.models.Messages;

  const server = createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {}
  });

  // socket.io
  io.on('connection', (socket) => {
    console.log('socket connected: ', socket.id);

    socket.on('disconnect', () => {
      console.log('socket disconnected: ', socket.id);
      socket.reconnected = false;
    });

    socket.on('reconnect', async () => {
      console.log('socket reconnected: ', socket.id);
      socket.reconnected = true;

      if (!socket.recovered && socket.reconnected) {
        // if the connection state recovery was not successful
        try {
          const messages = await Messages.findAll();
          messages.forEach((message) => {
            socket.emit('chat message', message.content, message.id);
          });
        } catch (e) {
          console.error('Failed to recover the connection state', e);
          return;
        }
      };
    });

    socket.on('chat message', async (msg) => {
      let result;
      try {
        result = await Messages.create({ content: msg });
        console.log(result);
      } catch (e) {
        console.error('Failed to create message', e);
        console.error('Error name:', e.name);
        console.error('Error message:', e.message);
        return;
      }

      const lastMessage = await Messages.findOne({ order: [['id', 'DESC']] });
      if (lastMessage) {
        io.emit('chat message', lastMessage.content);
      };
    });
  });

  server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
};

main();