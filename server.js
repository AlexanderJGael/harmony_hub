const path = require('path');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const { createServer } = require('http');
const { Server } = require('socket.io');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { DataTypes } = require('sequelize');
const { Model, Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;

const server = createServer(app);
const io = new Server(server);

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

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync().then(() => {
  console.log(sequelize.models);
  console.log('Database synced');
})
.catch((err) => {
  console.error('Failed to sync the database', err);
});

  // socket.io
io.on('connection', (socket) => {
  console.log('socket connected: ', socket.id);
  socket.on('chat message', async (msg) => {
    console.log('message: ' + msg);
    const { Messages } = ('./config/database');

    let result = null;
    try {
      result = await sequelize.models.Messages.create({ content: msg });
      console.log(result);
    } catch (e) {
      console.error('Failed to create message', e);
      console.error('Error name:', e.name);
      console.error('Error message:', e.message);
      return;
    };

    io.emit('chat message', msg, result.id);

    if (!socket.recovered) {
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
});
    
server.listen(PORT, () => {
  console.log(`Now listening on https://localhost:${PORT}`);
});
