import React, { useState } from 'react';
import '../styles/AddProduct.css';
import { productAPI, categoryAPI } from '../services/api';

const AddProduct = ({ categories, onProductAdded, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    categories: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Product name must not exceed 100 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.trim().length > 1000) {
      newErrors.description = 'Description must not exceed 1000 characters';
    }

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }

    if (formData.categories.length === 0) {
      newErrors.categories = 'At least one category is required';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleCategoryChange = (categoryId) => {
    setFormData((prev) => {
      const categories = prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories };
    });
    // Clear error for categories
    if (errors.categories) {
      setErrors((prev) => ({
        ...prev,
        categories: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await productAPI.createProduct({
        name: formData.name.trim(),
        description: formData.description.trim(),
        quantity: parseInt(formData.quantity),
        categories: formData.categories,
      });

      if (response.data.success) {
        setSuccessMessage('Product added successfully!');
        setFormData({
          name: '',
          description: '',
          quantity: '',
          categories: [],
        });
        setErrors({});

        // Call the callback to refresh product list
        onProductAdded();

        // Close form after 2 seconds
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 2000);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const errorMap = {};
        error.response.data.errors.forEach((err) => {
          errorMap[err.field] = err.message;
        });
        setErrors(errorMap);
      } else if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: 'Failed to add product. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-modal">
      <div className="add-product-container">
        <div className="add-product-header">
          <h2>Add New Product</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              disabled={loading}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description (at least 10 characters)"
              rows="4"
              disabled={loading}
            />
            {errors.description && (
              <span className="error-text">{errors.description}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                min="0"
                disabled={loading}
              />
              {errors.quantity && (
                <span className="error-text">{errors.quantity}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Categories * (Select at least one)</label>
            <div className="categories-list">
              {categories.map((category) => (
                <label key={category._id} className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                    disabled={loading}
                  />
                  {category.name}
                </label>
              ))}
            </div>
            {errors.categories && (
              <span className="error-text">{errors.categories}</span>
            )}
          </div>

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
