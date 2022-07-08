const router = require('express').Router();
const userController = require('../controllers/users');

router.get('/get-all', userController.getAllUsers);
router.get('/get-single/:id', userController.getSingleUser);

router.patch('/edit-user/:id', userController.editUser);
router.delete('/delete-user/:id', userController.deleteUser);

router.patch('/change-password/:id', userController.changePassword);

module.exports = router;
