import instance from './axios';

export async function createOrder(payload) {
  const { data } = await instance.post('/api/orders', payload);
  return data;
}

export async function listOrders(params = {}) {
  const { data } = await instance.get('/api/orders', { params });
  return data;
}

export async function getOrder(id) {
  const { data } = await instance.get(`/api/orders/${id}`);
  return data;
}

export async function updateOrderStatus(id, status) {
  const { data } = await instance.patch(`/api/orders/${id}/status`, { status });
  return data;
}
