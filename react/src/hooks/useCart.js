import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '../api/cart';
import { useAuth } from './useAuth';

export function useCart() {
  const { isAuth } = useAuth();
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: !!isAuth,
  });

  const addMutation = useMutation({
    mutationFn: ({ productId, qty }) => addToCart(productId, qty),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ productId, qty }) => updateCartItem(productId, qty),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const removeMutation = useMutation({
    mutationFn: (productId) => removeCartItem(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const clearMutation = useMutation({
    mutationFn: () => clearCart(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const cart = cartQuery.data || { items: [] };
  const cartCount = useMemo(() => {
    const items = Array.isArray(cart?.items) ? cart.items : [];
    return items.reduce((acc, it) => acc + (it.qty || 0), 0);
  }, [cart]);

  const total = useMemo(() => {
    const items = Array.isArray(cart?.items) ? cart.items : [];
    return items.reduce((sum, it) => sum + (Number(it.price || it.product?.price || 0) * Number(it.qty || 0)), 0);
  }, [cart]);

  return {
    cart,
    cartCount,
    total,
    isLoading: cartQuery.isLoading,
    isError: cartQuery.isError,
    addMutation,
    updateMutation,
    removeMutation,
    clearMutation,
  };
}
