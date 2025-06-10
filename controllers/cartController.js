const User = require('../models/User'); 
const Cart = require('../models/Cart');
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

    // Check if the user's cart already exists
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
if (existingItem) {
  // Convert both quantities to numbers before adding to prevent string concatenation
  existingItem.quantity = Number(existingItem.quantity) + Number(quantity);
} else {
  cart.items.push({ productId, quantity: Number(quantity) }); //Add to cart
}


    await cart.save(); // Save the cart to the Cart model
    res.status(200).json(cart.items); // Return the updated cart items
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
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity; // Update the quantity
    await cart.save();
    res.status(200).json(cart.items); // Return the updated cart items
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a product from the user's cart
const removeFromCart = async (req, res) => {
  const { id } = req.params; // id is the cart item ID
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex(item => item._id.toString() === id);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart array
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.status(200).json(cart.items); // Return the updated cart items
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all items in the user's cart
const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart.items); // Return the cart items
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, updateCart, removeFromCart, getCart };
