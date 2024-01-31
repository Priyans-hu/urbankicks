const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');
const isAuth = require('../middleware/isAuth');

// public Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/category/:category', productController.getProductsByCategory);

// authenticated routes
router.post('/', isAuth, productController.createProduct);
router.put('/:id', isAuth, productController.updateProduct);
router.delete('/:id', isAuth, productController.deleteProduct);

module.exports = router;