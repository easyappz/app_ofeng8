import instance from './axios';

export async function listProducts(params = {}) {
  const { data } = await instance.get('/api/products', { params });
  return data;
}

export async function getProduct(id) {
  const { data } = await instance.get(`/api/products/${id}`);
  return data;
}

export async function createProduct(payload) {
  const { data } = await instance.post('/api/products', payload);
  return data;
}

export async function updateProduct(id, payload) {
  const { data } = await instance.put(`/api/products/${id}`, payload);
  return data;
}

export async function deleteProduct(id) {
  const { data } = await instance.delete(`/api/products/${id}`);
  return data;
}
