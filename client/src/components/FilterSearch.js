import React, { useState, useEffect } from 'react';
import '../styles/FilterSearch.css';
import { categoryAPI } from '../services/api';

const FilterSearch = ({
  onSearch,
  onFilterChange,
  initialSearch = '',
  initialCategories = [],
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategories
  );
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandCategories, setExpandCategories] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryToggle = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updatedCategories);
    onFilterChange(updatedCategories);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    onSearch('');
    onFilterChange([]);
  };

  const hasActiveFilters = searchTerm || selectedCategories.length > 0;

  return (
    <div className="filter-search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="filters-section">
        <button
          className="categories-toggle"
          onClick={() => setExpandCategories(!expandCategories)}
        >
          <span>Categories</span>
          <span className={`arrow ${expandCategories ? 'expanded' : ''}`}>
            ▼
          </span>
          {selectedCategories.length > 0 && (
            <span className="badge">{selectedCategories.length}</span>
          )}
        </button>

        {expandCategories && (
          <div className="categories-dropdown">
            {loading ? (
              <div className="loading-categories">Loading categories...</div>
            ) : (
              <div className="categories-options">
                {categories.map((category) => (
                  <label key={category._id} className="category-option">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => handleCategoryToggle(category._id)}
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={handleClearFilters}>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterSearch;
