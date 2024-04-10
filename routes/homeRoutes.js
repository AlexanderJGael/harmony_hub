const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const path = require('path');
const withAuth = require('../utils/auth');
const { User, Profile } = require('../models');

router.get('/', async (req, res) => {
    try {
        const logged_in = req.session.logged_in;
        if (!logged_in) {
            res.render('homepage', {logged_in: false});
            return;
        }

        const user = req.session.user;
        res.render('homepage', { logged_in: logged_in, user: user });
    }
     catch (err) {
         res.status(500).json(err);
     }
 });

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/register', async (req, res) => {
    try {
        res.render('register');
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/forum', async (req, res) => {
    try {
        res.render('forum', {logged_in: req.session.logged_in, user: req.session.user});
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/blog', async (req, res) => {
    try {
        res.render('blog', {logged_in: req.session.logged_in, user: req.session.user});
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/logout', loginController.logoutGet);
router.get('/api/logout', loginController.logoutGet);
router.post('/api/logout', loginController.logoutPost);

router.post('/api/login', loginController.loginPost);
router.post('/api/users', loginController.registerPost);

module.exports = router;