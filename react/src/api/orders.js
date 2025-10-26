import instance from './axios';

export const createOrder = async ({ delivery, payment }) => {
  const res = await instance.post('/api/orders', { delivery, payment });
  return res.data;
};

export const listOrders = async (params = {}) => {
  const res = await instance.get('/api/orders', { params });
  return res.data;
};

export const getOrder = async (id) => {
  const res = await instance.get(`/api/orders/${id}`);
  return res.data;
};

export const updateOrderStatus = async (id, { status }) => {
  const res = await instance.patch(`/api/orders/${id}/status`, { status });
  return res.data;
};

export const notifyOrder = async (id, { message }) => {
  const res = await instance.post(`/api/orders/${id}/notify`, message ? { message } : {});
  return res.data;
};
