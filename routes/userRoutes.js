const express = require('express');
const router = express.Router();
const { User } = require("../models")
const userController = require('../controllers/userController');
const profileController = require('../controllers/profileController');


router.get('/api/user/create', userController.userCreateGet);
router.post('/api/user/create', userController.userCreate);
router.get('/users', userController.userList);
router.get('/api/users', userController.userList);
router.post('/api/users', userController.userCreate);

module.exports = router;

/* router.post('/api/register', async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
      }).exec();
  
      // Set the user session after successful registration
      req.session.user = newUser;
      req.session.logged_in = true;
  
      // Redirect to the homepage
      res.redirect('/');
    } catch (error) {
        return next(error);
    }
  }); */

/* router.post('/api/login', async (req, res) => {
  console.log(' POST /api/login');
  console.log(req.body);
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
  }); */


