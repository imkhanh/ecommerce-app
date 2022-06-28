const router = require('express').Router();
const customizeController = require('../controllers/CustomizeControllers');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../client/public/uploads/slides'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get('/get-all-image', customizeController.getAllSlides);
router.get('/get-all-data', customizeController.getAllData);
router.post('/upload-image', upload.single('slideImage'), customizeController.uploadSlideImage);
router.delete('/delete-image/:id', customizeController.deleteSlideImage);

module.exports = router;
