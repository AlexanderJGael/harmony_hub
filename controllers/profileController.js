const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET user profile
router.get('/profile', async (req, res) => {
    try {
        const userProfile = await User.findOne({ where: { id: req.user.id } });
        res.json(userProfile);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST update user profile
router.post('/profile', async (req, res) => {
    try {
        const { username, email, aboutMe } = req.body;
        const updatedUser = await User.update(
            { username, email, aboutMe },
            { where: { id: req.user.id } }
        );

        res.json({ message: 'User profile updated successfully' });
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;