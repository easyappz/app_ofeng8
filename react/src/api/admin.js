import instance from './axios';

export const getDashboard = async () => {
  const res = await instance.get('/api/admin/dashboard');
  return res.data;
};
