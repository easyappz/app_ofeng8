import instance from './axios';

export const register = async (data) => {
  const res = await instance.post('/api/auth/register', data);
  return res.data;
};

export const login = async (data) => {
  const res = await instance.post('/api/auth/login', data);
  return res.data;
};

export const getMe = async () => {
  const res = await instance.get('/api/auth/me');
  return res.data;
};
