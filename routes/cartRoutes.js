const express = require('express');
const { addToCart, updateCart, removeFromCart } = require('../controllers/cartController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticate, addToCart);
router.put('/:id', authenticate, updateCart);
router.delete('/:id', authenticate, removeFromCart);

module.exports = router;
