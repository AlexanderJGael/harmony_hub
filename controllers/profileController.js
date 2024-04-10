const User = require('../models/User');

// GET user profile
exports.profileGet =  async (req, res, next) => {
    try {
        const userProfile = await User.findOne({ where: { id: req.user.id } });
        res.json(userProfile);
    } catch (e) {
        console.error(e);
        return next(e);
    }
};

// POST create new user profile
exports.profileCreate = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create(
            { username, email, password, profilePicture: profilePic }
            );
            res.json(newUser);
        } catch (e) {
            console.error(e);
            return next(e);
        }
    };
    
exports.profileDelete = async (req, res, next) => {
    try {
        const deletedUser = await User.destroy({ where: { id: req.user.id } });
        res.json(deletedUser);
    } catch (e) {
        console.error(e);
        return next(e);
    }
};

// POST update user profile
exports.profileUpdate = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const updatedUser = await User.update(
            { username, email, password },
            { where: { id: req.user.id } }
        );
        res.json(updatedUser);
    } catch (e) {
        console.error(e);
        return next(e);
    }
};