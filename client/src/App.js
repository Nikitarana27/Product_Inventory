import React, { useState, useEffect, useCallback } from 'react';
import './styles/App.css';
import { productAPI, categoryAPI } from './services/api';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import FilterSearch from './components/FilterSearch';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');

  const ITEMS_PER_PAGE = 10;

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  }, []);

  const fetchProducts = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await productAPI.getAllProducts(
        page,
        ITEMS_PER_PAGE,
        searchTerm,
        selectedCategories
      );

      if (response.data.success) {
        setProducts(response.data.data.products);
        setTotalPages(response.data.data.pagination.totalPages);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Failed to load products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [ITEMS_PER_PAGE, searchTerm, selectedCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts(1);
  }, [searchTerm, selectedCategories, fetchProducts]);

  const handleAddProduct = () => {
    setCurrentPage(1);
    fetchProducts(1);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await productAPI.deleteProduct(productId);
      if (response.data.success) {
        setDeleteMessage('Product deleted successfully!');
        setTimeout(() => setDeleteMessage(''), 3000);
        // Refresh products
        if (products.length === 1 && currentPage > 1) {
          // If this was the last product on the page, go to previous page
          fetchProducts(currentPage - 1);
        } else {
          fetchProducts(currentPage);
        }
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  const handleFilterChange = (categories) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    fetchProducts(page);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>📦 Product Inventory System</h1>
          <button
            className="btn btn-primary add-product-btn"
            onClick={() => setShowAddForm(true)}
          >
            + Add New Product
          </button>
        </div>
      </header>

      <main className="app-main">
        {deleteMessage && (
          <div className="success-message">{deleteMessage}</div>
        )}

        <FilterSearch
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          initialSearch={searchTerm}
          initialCategories={selectedCategories}
        />

        <ProductList
          products={products}
          onDelete={handleDeleteProduct}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </main>

      {showAddForm && (
        <AddProduct
          categories={categories}
          onProductAdded={handleAddProduct}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

export default App;
