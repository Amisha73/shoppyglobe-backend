const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, inStock, price } = req.body;
    // Basic validation
    if (!name || typeof price !== 'number' || typeof inStock !== 'number') {
      return res.status(400).json({ message: 'Name, price, and inStock fields are required and must be valid' });
    }
    const product = new Product({
      name,
      description: description || '',
      price,
      inStock, 
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error adding product' });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  const { id } = req.params; // Get the product ID from the request parameters
  const { name, description, inStock, price } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Update product fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (typeof inStock === 'number') product.inStock = inStock; 
    if (typeof price === 'number') product.price = price; 

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error updating product' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params; // Get the product ID from the request parameters

  try {
    const product = await Product.findByIdAndDelete(id); // Find and delete the product
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(204).send(); // No content to send back
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error deleting product' });
  }
};

