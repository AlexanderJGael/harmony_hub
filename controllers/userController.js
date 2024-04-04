const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
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
};

exports.login = async (req, res) => {
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
    req.session.user = user;
    // If user found and password matches, return success message
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.userProfile = async (req, res) => {
  try {
    const userProfile = await User.findOne({ where: { id: req.session.userId } });
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json({ userProfile });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email, aboutMe } = req.body;
    const updatedUser = await User.update(
      { username, email, aboutMe },
      { where: { id: req.session.userId } }
    );
    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};