const express = require('express');
const { addToCart, updateCart, removeFromCart, getCart } = require('../controllers/cartController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/addToCart', authenticate, addToCart);
router.put('/:id', authenticate, updateCart);
router.delete('/:id', authenticate, removeFromCart);
router.get('/', authenticate, getCart);

module.exports = router;
