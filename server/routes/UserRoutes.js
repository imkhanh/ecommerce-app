const router = require('express').Router();
const userController = require('../controllers/UserControllers');

router.get('/get-all', userController.getAllUsers);
router.get('/get-single/:id', userController.getSingleUser);
router.patch('/update-user/:id', userController.updateUser);
router.patch('/change-password/:id', userController.changePassword);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;
