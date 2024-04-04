const router = require('express').Router();
const profileController = require('../controllers/profileController');

router.get('/profile', profileController.getUserProfile);
router.post('/profile', profileController.updateProfile);

module.exports = router;