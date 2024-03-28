const path = require('path');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const { createServer } = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { DataTypes } = require('sequelize');
const { Model, Sequelize } = require('sequelize');

const { error } = require('console');

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRoutes);
app.use(routes);


sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Now listening on https://localhost:${PORT}`);
    console.log('Database synced');
  });

  // Initialize Socket.IO
  helpers.socketInit(io, sequelize);
})
.catch((error) => {
  console.error('Failed to sync the database', error);
});
