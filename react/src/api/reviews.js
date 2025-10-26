import instance from './axios';

export const getReviews = async (productId) => {
  const res = await instance.get(`/api/products/${productId}/reviews`);
  return res.data;
};

export const addReview = async (productId, data) => {
  const res = await instance.post(`/api/products/${productId}/reviews`, data);
  return res.data;
};
