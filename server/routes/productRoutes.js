const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const {
  validateProduct,
  handleValidationErrors,
} = require('../middleware/validation');

const router = express.Router();

// Product routes
router.post('/', validateProduct, handleValidationErrors, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', validateProduct, handleValidationErrors, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
