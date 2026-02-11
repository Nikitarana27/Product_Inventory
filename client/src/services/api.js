import axios from 'axios';

const API_BASE_URL = '/api';

// Product API calls
export const productAPI = {
  createProduct: (productData) =>
    axios.post(`${API_BASE_URL}/products`, productData),
  getAllProducts: (page = 1, limit = 10, search = '', categories = []) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (search) params.append('search', search);
    if (categories.length > 0) params.append('categories', categories.join(','));
    return axios.get(`${API_BASE_URL}/products?${params}`);
  },
  getProduct: (id) => axios.get(`${API_BASE_URL}/products/${id}`),
  updateProduct: (id, productData) =>
    axios.put(`${API_BASE_URL}/products/${id}`, productData),
  deleteProduct: (id) => axios.delete(`${API_BASE_URL}/products/${id}`),
};

// Category API calls
export const categoryAPI = {
  getAllCategories: () => axios.get(`${API_BASE_URL}/categories`),
  getCategory: (id) => axios.get(`${API_BASE_URL}/categories/${id}`),
};

export default {
  productAPI,
  categoryAPI,
};
