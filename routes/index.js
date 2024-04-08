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
router.use('/users', userRoutes)
router.use('/api/users', userRoutes)
router.use('/api/user', userRoutes)
router.use('/api/user/create', userRoutes)

// MESSAGE routes
router.use('/chat', messageRoutes)
router.use('/api/chat', messageRoutes)

// PROFILE routes
router.use('/user', profileRoutes)

module.exports = router;