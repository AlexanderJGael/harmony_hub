const router = require('express').Router();
const withAuth = require('../utils/auth');
const profileController = require('../controllers/profileController');

router.use(withAuth);
router.use('/profile', profileController);

module.exports = router;