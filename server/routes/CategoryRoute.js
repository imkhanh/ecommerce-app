const router = require('express').Router();
const CategoryController = require('../controllers/CategoryControllers');

router.get('/get-all', CategoryController.getAllCategories);
router.post('/add-category', CategoryController.addCategory);
router.patch('/edit-category/:id', CategoryController.editCategory);
router.delete('/delete-category/:id', CategoryController.deleteCategory);

module.exports = router;
