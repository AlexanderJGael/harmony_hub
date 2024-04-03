const router = require('express').Router();

const homeRoutes = require('../routes/homeRoutes');
const userRoutes = require('../routes/userRoutes');
const profileRoutes = require('../routes/profileRoutes');
const loginRoutes = require('../routes/loginRoutes');

router.use('/', homeRoutes);
router.use('/user', userRoutes);
router.use('/profile', profileRoutes);
router.use('/login', loginRoutes);

module.exports = router;