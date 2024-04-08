const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const loginRoutes = require("./loginRoutes");
const messageRoutes = require("./messageRoutes");
const profileRoutes = require("./profileRoutes");
const blogRoutes = require("./blogRoutes");
const forumRoutes = require("./forumRoutes");

//LOGIN routes
router.use('/', loginRoutes);
router.use('/login', loginRoutes)
router.use('/register', userRoutes)
router.use('/logout', loginRoutes)

// USER routes
router.use('/api/users', userRoutes)

// MESSAGE routes
router.use('/chat', messageRoutes)
router.use('/api/chat', messageRoutes)

// PROFILE routes
router.use('/profile', profileRoutes)

// BLOG routes
router.use('/blog', blogRoutes)

// FORUM routes
router.use('/forum', forumRoutes)

module.exports = router;