import api from './api';

export const addProduct = async (product) => {
  return await api.post('/products', product);
};

export const getProducts = async () => {
  return await api.get('/products');
};

// Add more admin-related services as necessary
