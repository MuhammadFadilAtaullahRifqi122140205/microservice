const Product = require('../models/Product');
const { Op } = require('sequelize');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const userId = req.user.userId;
    console.log(userId);

    if (!name || !price || !description || !image) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }

    const product = await Product.create({
      name,
      price,
      description,
      image,
      userId,
    });

    return res.json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const userId = req.user.userId; // Get the current user's ID
    const products = await Product.findAll({
      where: {
        userId: {
          [Op.ne]: userId, // Exclude products where userId matches the current user's ID
        },
      },
    });
    return res.json({ products });
  } catch (error) {
    console.error('Error getting products:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllMyProducts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const products = await Product.findAll({ where: { userId } });
    return res.json({ products });
  } catch (error) {
    console.error('Error getting products:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({ product });
  } catch (error) {
    console.error('Error getting product:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const userId = req.user.userId;
    const product = await Product.findByPk(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { name, price, description, image } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (image) product.image = image;
    await product.save();

    return res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const userId = req.user.userId;
    const product = await Product.findByPk(req.params.productId);

    if (product.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.destroy({ where: { id: req.params.productId } });

    return res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: error.message });
  }
};
