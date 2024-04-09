const express = require('express');
const router = express.Router();
const path = require('path');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {logged_in: req.session.logged_in, user: req.session.user});
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

module.exports = router;