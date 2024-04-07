const main = async () => {
const morgan = require('morgan');
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

// Import routes
const routes = require('./routes')

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

app.use(morgan('dev'));
  
  app.use(sessionMiddleware);
  
  // Parse incoming requests with JSON payloads
  app.use(express.json());
  
  // Parse incoming requests with URL-encoded payloads
  app.use(express.urlencoded({ extended: true }));
  
  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, 'public')));
  
  // Mount routes
  app.use(routes);
  //app.use('/api/login', loginRoutes);
  //app.use('/api/user', userRoutes);
  //app.use('/api/profiles', profileRoutes);
  //app.use('/', homeRoutes);
  
  // Synchronize the session store
  const SequelizeStore = require('connect-session-sequelize')(session.Store);
  const sequelize = require('./config/connection');
  const sessionStore = new SequelizeStore({ db: sequelize });
  sessionStore.sync();

  // Initialize Socket.IO with the HTTP server
  const io = new Server(server, {
    connectionStateRecovery: {},
    adapter: createAdapter(),
  });

  // Handle Socket.IO connections
/*   io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
  }); */

  io.on('connection', async (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    socket.on('chat message', async (msg) => {
      console.log('Message received:', msg);
      try {
      const message = await helpers.createMessage(msg);
      // Only broadcast the most recently created message
      socket.broadcast.emit('chat message', msg, message.id);
      console.log('Message created');
      } catch (e) {
      console.error(e);
      socket.emit('chat message', 'An error occurred while creating the message');
      return;
      }
    });
  
    if (!socket.recovered) {
      // if the connection state recovery was not successful
      try {
      const messages = await helpers.getMessagesAfterId({ id: 0 });
      messages.forEach(message => {
        socket.broadcast.emit('chat message', message.content, message.id);
      });
      } catch (e) {
        console.error(e);
        socket.emit('chat message', 'An error occurred while fetching the chat log');
      }
    };
  });

  // Define the port number
  const PORT = process.env.PORT || 3001;

  // Start the server
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();