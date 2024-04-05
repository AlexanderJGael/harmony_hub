const router = require('express').Router();

const homeRoutes = require('../routes/homeRoutes');
const userRoutes = require('../routes/userRoutes');
const profileRoutes = require('../routes/profileRoutes');
const loginRoutes = require('../routes/loginRoutes');

router.use('/', homeRoutes);
router.use('/api/user', userRoutes);
router.use('/api/profile', profileRoutes);
router.use('/api/login', loginRoutes);

module.exports = router;