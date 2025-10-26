import instance from './axios';

export const getCart = async () => {
  const res = await instance.get('/api/cart');
  return res.data;
};

export const addToCart = async ({ productId, qty }) => {
  const res = await instance.post('/api/cart', { productId, qty });
  return res.data;
};

export const updateCartItem = async (productId, { qty }) => {
  const res = await instance.put(`/api/cart/${productId}`, { qty });
  return res.data;
};

export const removeCartItem = async (productId) => {
  const res = await instance.delete(`/api/cart/${productId}`);
  return res.data;
};

export const clearCart = async () => {
  const res = await instance.delete('/api/cart');
  return res.data;
};
