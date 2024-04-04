const path = require('path');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const router = require('./controllers');
const routes = require('./routes')
const helpers = require('./utils/helpers');
const { createServer } = require('http');
const { Server } = require('socket.io');
const os = require('os');
const cluster = require('cluster');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');

if (cluster.isPrimary) {
  const numCPUSs = os.cpus().length;
  // create one worker per availble core
  for (let i = 0; i < numCPUSs; i++) {  
    cluster.fork({
        PORT: 3000 + i
      });
  }

  // set up the adapter on the primary thread
  return setupPrimary();
}

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { DataTypes } = require('sequelize');
const { Model, Sequelize } = require('sequelize');
const { Messages, User } = require('./config/database');
const { authenticateUser } = require('./controllers/userController');


const main = async () => {
  const app = express();
  const hbs = exphbs.create({ helpers });
  const server = createServer(app);

  const sess = {
    secret: 'Super secret secret',
    cookie: { secure: true },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  app.use(session(sess));
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(routes)

  sequelize.sync().then(() => {
    console.log('Database synced');
  })
  .catch((e) => {
    console.error('Failed to start the server', e);
  });

  const io = new Server(server, {
    connectionStateRecovery: {},
    // set up the adsapter on each worker thread
    adapter: createAdapter(),
  });
  const { createMessage, getMessagesAfterId, getMessages } = require('./controllers/messageController');

  io.on('connection', async (socket) => {
    console.log('a user connected');
    socket.on('hello', (value, callback) => {
      // once the event is succesffully handled
      callback();
    });

    socket.on('request chat log', async () => {
      try {
        const messages = await getMessages();

        socket.emit('chat log', messages);
      } catch (e) { 
        console.error('Error occurred while sending chat log:', e);
        socket.emit('error', 'An error occurred while sending your chat log. Please try again.');
      }
    });

    socket.on('chat message', async (msg, clientOffset, callback) => {
      console.log('message: ' + msg);
      try {
        const message = await createMessage({ content: msg, client_offset: clientOffset });
        callback();
        socket.emit('chat message', msg, message.id, clientOffset);
        callback();
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          console.error('Validation errors:', e.errors);
        } else {
        console.error('Error occurred while sending chat message:', e);
        socket.emit('error', 'An error occurred while sending your message. Please try again.');
        };
      };
      callback();
    });

    if (!socket.recovered) {
      try {
        const messages = await getMessagesAfterId(socket.handshake.auth.serverOffset || 0);
        for (let message of messages) {
          socket.emit('chat message', message.content, message.id);
        }
      } catch (e) {
        console.error(e)
        console.error('Error occurred while sending chat messages:', e);
        socket.emit('error', 'An error occurred while sending your messages. Please try again.');
      };
    };
  });

  //each worker will listen on a distinct port
  const port = process.env.PORT;

  server.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  });
};

main();