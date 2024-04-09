const User = require('../models/User');
const { Op } = require('sequelize');

exports.userGet = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.session.userId } });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    return next(e);
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

exports.userCreateGet = (req, res, next) => {
  try {
    res.status(200).json({ message: 'Create user' });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.userPost = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({
      username,
      email,
      password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.logged_in = true;

      // mkake post to /api/users/:id
      fetch(`/api/users/${newUser.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      }).then(res => res.json())
      .then(data => console.log(data))
      .catch(e => { console.log(data) });
      
      res.status(200).json({ message: 'User created successfully' });
      }) 
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.userValidate = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }
    res.status(200).json({ message: 'User does not exist' });
  }
  catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.userList = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.userUpdate = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const updatedUser = await User.update(
      { username, email, password },
      { where: { id: req.params.id } }
    );
    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.userDelete = async (req, res, next) => {
  try {
    const deletedUser = await User.destroy({ where: { id: req.params.id } });
    if (deletedUser === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.userUpdate = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const updatedUser = await User.update(
      { username, email, password },
      { where: { id: req.params.id } }
    );
    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

