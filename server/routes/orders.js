const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');

router.get('/get-all-orders', orderController.getAllOrders);
router.post('/get-single-order', orderController.getSingleOrder);
router.post('/create-order', orderController.createOrder);
router.post('/edit-order', orderController.editOrder);
router.post('/delete-order', orderController.deleteOrder);

module.exports = router;
