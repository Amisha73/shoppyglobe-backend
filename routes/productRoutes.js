const express = require('express');
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);
module.exports = router;
