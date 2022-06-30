const router = require('express').Router();
const categoryController = require('../controllers/categories');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../client/public/uploads/categories/'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get('/get-all', categoryController.getAllCategories);
router.get('/get-single/:id', categoryController.getSingleCategory);
router.post('/add-category', upload.single('image'), categoryController.addCategory);

module.exports = router;
