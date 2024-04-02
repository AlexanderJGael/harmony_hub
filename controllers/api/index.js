const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// Import routes

// Use routes
router.use('api/user', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;