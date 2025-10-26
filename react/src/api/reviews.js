import instance from './axios';

export async function getReviews(productId) {
  const { data } = await instance.get(`/api/products/${productId}/reviews`);
  return data;
}

export async function addReview(productId, payload) {
  const { data } = await instance.post(`/api/products/${productId}/reviews`, payload);
  return data;
}
