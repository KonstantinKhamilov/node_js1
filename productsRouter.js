// productsRouter.js
const express = require('express');
const router = express.Router();
const productsController = require('./productsController');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.get('/filter', productsController.filterProducts);

router.post('/', productsController.createProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;