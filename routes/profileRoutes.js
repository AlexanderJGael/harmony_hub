const router = require('express').Router();
const profileController = require('../controllers/profileController');

router.use('/profile', profileController);

module.exports = router;