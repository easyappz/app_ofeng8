import { useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authLogin, authRegister, getMe } from '../api/auth';

export function useAuth() {
  const queryClient = useQueryClient();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !!token,
  });

  const loginMutation = useMutation({
    mutationFn: authLogin,
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: authRegister,
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    queryClient.removeQueries({ queryKey: ['me'] });
    queryClient.removeQueries({ queryKey: ['cart'] });
  }, [queryClient]);

  const value = useMemo(() => ({
    user: meQuery.data?.user || meQuery.data || null,
    isAuth: !!(meQuery.data || token),
    isLoading: meQuery.isLoading,
    loginMutation,
    registerMutation,
    logout,
  }), [meQuery.data, meQuery.isLoading, loginMutation, registerMutation, logout, token]);

  return value;
}
