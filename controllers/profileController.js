const User = require('../models/User');

// GET user profile
exports.getUserProfile =  async (req, res) => {
    try {
        const userProfile = await User.findOne({ where: { id: req.user.id } });
        res.json(userProfile);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST update user profile
exports.updateProfile = async (req, res) => {
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
};