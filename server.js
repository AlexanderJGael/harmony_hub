const path = require('path');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const { createServer } = require('http');
const { Server } = require('socket.io');
const os = require('os');
const cluster = require('cluster');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');

// Load environment variables from .env file
dotenv.config();

const main = async () => {
  // Import routes
  const loginRoutes = require('./routes/loginRoutes');
  const userRoutes = require('./routes/userRoutes');
  const profileRoutes = require('./routes/profileRoutes');
  const homeRoutes = require('./routes/homeRoutes');

  // Check if the current process is the primary process
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;

    // Create one worker per available core
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork({
        PORT: process.env.PORT || 3000 + i,
      });
    }

    // Set up the adapter on the primary thread
    return setupPrimary();
  }

  // Create Express app
  const app = express();
  const hbs = exphbs.create({ helpers });
  const server = createServer(app);
  const sequelize = require('./config/connection');
  const SequelizeStore = require('connect-session-sequelize')(session.Store);

  // Configure Handlebars as template engine
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, 'views'));

  // Set up session middleware
  const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'Super secret secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  });
  app.use(sessionMiddleware);

  // Parse incoming requests with JSON payloads
  app.use(express.json());

  // Parse incoming requests with URL-encoded payloads
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, 'public')));

  // Mount routes
  app.use('/', loginRoutes);
  app.use('/', userRoutes);
  app.use('/profiles', profileRoutes);
  app.use('/', homeRoutes);

  // Synchronize the session store
  const sessionStore = new SequelizeStore({ db: sequelize });
  sessionStore.sync();


  const { Sequelize } = require('sequelize');
  const { createMessage } = require('./models/Message');
  // Initialize Socket.IO with the HTTP server
  const io = new Server(server, {
      adapter: createAdapter(),
  });

  // Handle Socket.IO connections
  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
  });

  io.on('connection', (socket) => {
    // Handle socket events
  });

  io.on('chat message', async (msg) => {
    socket.on('chat message', async (msg) => {
      let result;
      try {
      result = await createMessage({ content: msg });
      } catch (e) {
      // TODO handle the failure
      return;
      }
      io.emit('chat message', msg, result.id);
    });

    if (!socket.recovered) {
      // if the connection state recovery was not successful
      try {
      const messages = await Message.findAll({
        where: {
        id: {
          [Sequelize.Op.gt]: socket.handshake.auth.serverOffset || 0
        }
        }
      });
      messages.forEach(message => {
        socket.emit('chat message', message.content, message.id);
      });
      } catch (e) {
      // something went wrong
      }
    }
  });

  // Define the port number
  const PORT = process.env.PORT || 3000;

  // Start the server
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();