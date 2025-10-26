import instance from './axios';

export const listProducts = async (params = {}) => {
  const res = await instance.get('/api/products', { params });
  return res.data;
};

export const getProduct = async (id) => {
  const res = await instance.get(`/api/products/${id}`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await instance.post('/api/products', data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await instance.put(`/api/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await instance.delete(`/api/products/${id}`);
  return res.data;
};
