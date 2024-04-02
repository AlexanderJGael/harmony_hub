const router = require('express').Router();
const path = require('path');
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
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