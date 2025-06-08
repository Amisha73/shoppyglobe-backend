const express = require('express');
const { getProducts, getProductById, addProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/addProduct', addProduct)
router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;
