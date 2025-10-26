import instance from './axios';

export async function getCart() {
  const { data } = await instance.get('/api/cart');
  return data;
}

export async function addToCart(productId, qty) {
  const { data } = await instance.post('/api/cart', { productId, qty });
  return data;
}

export async function updateCartItem(productId, qty) {
  const { data } = await instance.put(`/api/cart/${productId}`, { qty });
  return data;
}

export async function removeCartItem(productId) {
  const { data } = await instance.delete(`/api/cart/${productId}`);
  return data;
}

export async function clearCart() {
  const { data } = await instance.delete('/api/cart');
  return data;
}
