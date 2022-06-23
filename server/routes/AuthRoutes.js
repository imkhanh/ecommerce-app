const router = require('express').Router();
const authController = require('../controllers/AuthControllers');

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
