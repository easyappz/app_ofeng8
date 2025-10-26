import instance from './axios';

export async function createIntent(orderId) {
  const { data } = await instance.post('/api/payments/create-intent', { orderId });
  return data;
}

export async function confirmPayment(orderId, clientSecret) {
  const { data } = await instance.post('/api/payments/confirm', { orderId, clientSecret });
  return data;
}
