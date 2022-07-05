const router = require('express').Router();
const customizeController = require('../controllers/customizes');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../client/public/uploads/customizes/'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get('/get-all-data', customizeController.getAllData);
router.get('/get-all-slides', customizeController.getAllSlides);
router.post('/add-slide', upload.single('slideImage'), customizeController.addSlide);
router.delete('/delete-slide/:id', customizeController.deleteSlide);

module.exports = router;
