const router = require('express').Router();

const homeRoutes = require('../routes/homeRoutes');
const userRoutes = require('../routes/userRoutes');
const profileRoutes = require('../routes/profileRoutes');

router.use('/', homeRoutes);
router.use('/user', userRoutes);
router.use('/profile', profileRoutes);
router.use('/login', userRoutes);
router.use('/register', userRoutes);

module.exports = router;