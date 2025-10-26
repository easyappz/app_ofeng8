import instance from './axios';

export async function getDashboard() {
  const { data } = await instance.get('/api/admin/dashboard');
  return data;
}
