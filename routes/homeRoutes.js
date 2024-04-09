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


/* router.get('/profile', async (req, res) => {
    try {
        const user = req.session.user;
        res.render('profile',{logged_in:req.session.logged_in, user, posts:user.posts});
    } catch (err) {
        res.status(500).json(err);
    }
}); */

module.exports = router;