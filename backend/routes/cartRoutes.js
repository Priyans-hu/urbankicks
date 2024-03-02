const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:userId', cartController.getCartByUserId);
router.post('/:userId', cartController.addItemToCart);
router.delete('/:userId/:productId', cartController.removeItemFromCart);
router.put('/:userId/:item', cartController.updateItemInCart);
router.delete('/:userId', cartController.clearCart);

module.exports = router;
