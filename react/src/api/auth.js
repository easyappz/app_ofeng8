import instance from './axios';

export async function authRegister(payload) {
  const { data } = await instance.post('/api/auth/register', payload);
  return data;
}

export async function authLogin(payload) {
  const { data } = await instance.post('/api/auth/login', payload);
  return data;
}

export async function getMe() {
  const { data } = await instance.get('/api/auth/me');
  return data;
}
