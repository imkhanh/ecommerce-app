const router = require('express').Router();
const CategoryController = require('../controllers/CategoryControllers');

router.get('/get-all', CategoryController.getAllCategories);
router.post('/add-category', CategoryController.addCategory);

module.exports = router;
