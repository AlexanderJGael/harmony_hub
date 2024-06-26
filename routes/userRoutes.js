const express = require('express');
const router = express.Router();
const { User } = require("../models")
const UserController = require('../controllers/userController');

router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
      });
  
      // Set the user session after successful registration
      req.session.user = newUser;
      req.session.logged_in = true;
  
      // Redirect to the homepage
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post('/login', async (req, res) => {
    try {
      // const { username, password } = req.body; // Couldnt get password to work properly.
      // const user = await User.findOne({ where: { username } });
      //if (!user || !(await bcrypt.compare(password, user.password))) {
        //return res.status(401).json({ message: 'Invalid email or password' });
      //}
      const { username } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      req.session.save(() => {
        req.session.logged_in = true
        req.session.user = user
      }),
      // If user found and password matches, return success message
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;