import React from 'react';
import '../styles/ProductList.css';

const ProductList = ({
  products,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  loading,
}) => {
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (!products || products.length === 0) {
    return <div className="no-products">No products found. Add one to get started!</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      onDelete(productId);
    }
  };

  return (
    <div className="product-list-container">
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-header">
              <h3>{product.name}</h3>
              <button
                className="delete-btn"
                onClick={() => handleDelete(product._id, product.name)}
                title="Delete product"
              >
                🗑️
              </button>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-quantity">
              <span className="label">Quantity:</span>
              <span className="value">{product.quantity}</span>
            </div>

            <div className="product-date">
              <span className="label">Added on:</span>
              <span className="value">{formatDate(product.createdAt)}</span>
            </div>

            <div className="product-categories">
              {product.categories && product.categories.length > 0 ? (
                <div className="category-tags">
                  {product.categories.map((category) => (
                    <span key={category._id} className="category-tag">
                      {category.name}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="no-categories">No categories</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 0 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  className={`page-number ${
                    pageNum === currentPage ? 'active' : ''
                  }`}
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </button>
              )
            )}
          </div>

          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
