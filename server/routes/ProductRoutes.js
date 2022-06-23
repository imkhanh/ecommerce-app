const router = require('express').Router();
const ProductControllers = require('../controllers/ProductControllers');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../client/public/uploads/products'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get('/get-all', ProductControllers.getAllProducts);
router.get('/get-single/:id', ProductControllers.getSingleProduct);

router.post('/add-product', upload.any(), ProductControllers.addProduct);
router.patch('/update-product/:id', upload.any(), ProductControllers.updateProduct);
router.delete('/delete-product/:id', ProductControllers.deleteProduct);

module.exports = router;