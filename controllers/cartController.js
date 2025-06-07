const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add a product to the shopping cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assuming user ID is available in req.user after authentication

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      // Update the quantity if the product is already in the cart
      existingItem.quantity += quantity;
    } else {
      // Add new item to the cart
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the quantity of a product in the cart
const updateCart = async (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params; // id is the cart item ID

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update the quantity
    item.quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  const { id } = req.params; // id is the cart item ID

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart
    item.remove();
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, updateCart, removeFromCart };
