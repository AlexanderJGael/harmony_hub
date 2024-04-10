const router = require('express').Router();
const profileController = require('../controllers/profileController');

router.get('/:id', profileController.profileGet);
router.post('/:id', profileController.profileCreate);
router.put('/:id', profileController.profileUpdate);
router.delete('/:id', profileController.profileDelete);

module.exports = router;