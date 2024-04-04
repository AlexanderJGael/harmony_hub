const router = require('express').Router();
const path = require('path');
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const user = req.session.user;
        const welcomeMessage = user ? `Welcome, ${user.username}` : 'Welcome';
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/homepage', async (req, res) => {
    try {
        const user = req.session.user;
        const welcomeMessage = user ? `Welcome, ${user.username}` : 'Welcome';
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/forum', async (req, res) => {
    try {
        res.render('forum');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/registration', async (req, res) => {
    try {
        res.render('registration');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', async (req, res) => {
    try {
        res.render('profile');
    } catch (err) {
        res.status(500).json(err);
    }
});

// update the router.get() method to include withAuth as the second argument
router.get('/chat', async (req, res) => {
    try {
        res.render('chat', { layout: 'chatLayout' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;