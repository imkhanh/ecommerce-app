const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');

router.get('/get-all-orders', orderController.getAllOrders);
router.post('/get-single-order', orderController.getSingleOrder);
router.post('/create-order', orderController.createOrder);
router.patch('/update-order/:id', orderController.editOrder);
router.delete('/delete-order/:id', orderController.deleteOrder);

module.exports = router;
