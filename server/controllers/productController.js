const Product = require('../models/Product');
const Category = require('../models/Category');

// Create a new product
const createProduct = async (req, res, next) => {
  try {
    const { name, description, quantity, categories } = req.body;

    // Check if product name already exists
    const existingProduct = await Product.findOne({ name: name.trim() });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'A product with this name already exists',
      });
    }

    // Validate that all categories exist
    const validCategories = await Category.find({ _id: { $in: categories } });
    if (validCategories.length !== categories.length) {
      return res.status(400).json({
        success: false,
        message: 'One or more selected categories are invalid',
      });
    }

    const product = new Product({
      name,
      description,
      quantity,
      categories,
    });

    const savedProduct = await product.save();
    const populatedProduct = await savedProduct.populate('categories');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: populatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Get all products with pagination, search, and filtering
const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const categoryIds = req.query.categories
      ? req.query.categories.split(',')
      : [];

    // Build filter object
    const filter = {};

    // Search by product name
    if (search.trim()) {
      filter.name = { $regex: search.trim(), $options: 'i' };
    }

    // Filter by categories
    if (categoryIds.length > 0) {
      filter.categories = { $in: categoryIds };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // Fetch products
    const products = await Product.find(filter)
      .populate('categories')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get single product
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate('categories');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Update product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, quantity, categories } = req.body;

    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if new name already exists (if name is being changed)
    if (name && name !== product.name) {
      const existingProduct = await Product.findOne({ name: name.trim() });
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: 'A product with this name already exists',
        });
      }
    }

    // Validate categories if provided
    if (categories) {
      const validCategories = await Category.find({
        _id: { $in: categories },
      });
      if (validCategories.length !== categories.length) {
        return res.status(400).json({
          success: false,
          message: 'One or more selected categories are invalid',
        });
      }
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (quantity !== undefined) product.quantity = quantity;
    if (categories) product.categories = categories;

    const updatedProduct = await product.save();
    const populatedProduct = await updatedProduct.populate('categories');

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: populatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Delete product
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
