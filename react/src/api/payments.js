import instance from './axios';

export const createIntent = async ({ orderId }) => {
  const res = await instance.post('/api/payments/create-intent', { orderId });
  return res.data;
};

export const confirmPayment = async ({ orderId, clientSecret }) => {
  const res = await instance.post('/api/payments/confirm', { orderId, clientSecret });
  return res.data;
};
