const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

sequelize.sync()
    .then(() => {
        console.log('Database is synched!')
    })
    .catch((error) => {
        console.error('unable to sync!', error);
    })

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});