const express = require("express");
const router = express.Router();

const apiRoutes = require("../controllers/api");
const userRoutes = require("./userRoutes");
const loginRoutes = require("./loginRoutes");
const messageRoutes = require("./messageRoutes");
const profileRoutes = require("./profileRoutes");
const blogRoutes = require("./blogRoutes");
const forumRoutes = require("./forumRoutes");
const homeRoutes = require("./homeRoutes");

// HOME routes
router.use('/', homeRoutes)
router.use('/users', userRoutes)

// USER routes
router.use('/user', profileRoutes)

// MESSAGE routes
router.use('/chat', messageRoutes)

// PROFILE routes
router.use('/user/profile', profileRoutes)

// BLOG routes
router.use('/blog', blogRoutes)

// FORUM routes

router.use('/forum', forumRoutes)
router.use('/api', apiRoutes)

module.exports = router;