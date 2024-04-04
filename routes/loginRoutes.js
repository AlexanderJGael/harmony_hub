const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const User = require('../models/User');
const UserController = require('../controllers/userController');

const router = express.Router();

// Login route
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //const isValidPassword = user.checkPassword(password);

    //if (!isValidPassword) {
    //  return res.status(401).json({ message: 'Incorrect password' });
    //}
    // Set logged_in state to true in session
    req.session.logged_in = true;
    req.session.user = user;
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Service Error' });
  }
});

//router.post('/login', UserController.login);

module.exports = router;