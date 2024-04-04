const router = require('express').Router();
const path = require('path');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
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
        res.render('chat');
    } catch (err) {
        res.status(500).json(err);
    }
    });

module.exports = router;