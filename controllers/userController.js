const bcrypt = require('bcrypt');
const User = require('../models/User');

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