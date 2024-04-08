const router = require('express').Router();
const profileController = require('../controllers/profileController');

router.get('/user/:id', profileController.profileGet);
router.post('/user/:id', profileController.profileCreate);
router.put('/user/:id', profileController.profileUpdate);
router.delete('/user/:id', profileController.profileDelete);

module.exports = router;