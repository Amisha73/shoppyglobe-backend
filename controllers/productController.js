const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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
      stock: inStock,
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error adding product' });
  }
};
