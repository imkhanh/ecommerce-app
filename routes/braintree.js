const express = require('express');
const router = express.Router();
const brainTreeController = require('../controllers/braintree');

router.post('/get-token', brainTreeController.ganerateToken);
router.post('/payment', brainTreeController.paymentProcess);

module.exports = router;
