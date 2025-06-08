const User = require('../models/User'); 
const Product = require('../models/Product'); 

// Add a product to the user's cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }

    const existingItem = user.cart.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity; // Update quantity if already in cart
    } else {
      user.cart.push({ productId, quantity }); // Add new item to cart
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the quantity of a product in the user's cart
const updateCart = async (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params; // id is the cart item ID
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }

    const item = user.cart.id(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity; // Update the quantity
    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a product from the user's cart
const removeFromCart = async (req, res) => {
  const { id } = req.params; // id is the cart item ID
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }

    // Find the index of the item to remove
    const itemIndex = user.cart.findIndex(item => item._id.toString() === id);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    // Remove the item from the cart array
    user.cart.splice(itemIndex, 1);
    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all items in the user's cart
const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, updateCart, removeFromCart, getCart };
