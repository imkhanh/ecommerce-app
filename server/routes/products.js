const router = require('express').Router();
const productController = require('../controllers/products');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../client/public/uploads/products/'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get('/get-all-by-admin', productController.getAllProductByAdmin);
router.get('/get-all', productController.getAllProducts);
router.get('/get-single/:id', productController.getSingleProduct);
router.post('/add-product', upload.any(), productController.addProduct);
router.patch('/edit-product/:id', upload.any(), productController.editProduct);
router.delete('/delete-product/:id', productController.deleteProduct);

router.post('/add-cart', productController.addCartProduct);
router.post('/add-wish', productController.addWishProduct);
router.post('/add-review', productController.addReview);
router.post('/delete-review', productController.deleteReview);

module.exports = router;
