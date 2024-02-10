const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');
const isAuth = require('../middleware/isAuth');

// Routes with authentication
router.use(isAuth);

// route to get orders related to a specific user
router.get('/user/:userId', orderController.getUserOrders);

// general routes for create, read and delete order
router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;