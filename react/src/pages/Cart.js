import React from 'react';
import { useCart } from '../hooks/useCart';
import { Button, InputNumber, List, Spin, Empty, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, isLoading, updateMutation, removeMutation, clearMutation, total } = useCart();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20" data-easytag="id1-src/pages/Cart.js"><Spin /></div>
    );
  }

  const items = Array.isArray(cart?.items) ? cart.items : [];

  const handleQty = async (productId, qty) => {
    try {
      await updateMutation.mutateAsync({ productId, qty: Number(qty) });
    } catch {
      message.error('Не удалось обновить количество');
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeMutation.mutateAsync(productId);
    } catch {
      message.error('Не удалось удалить товар');
    }
  };

  const handleClear = async () => {
    try {
      await clearMutation.mutateAsync();
    } catch {
      message.error('Не удалось очистить корзину');
    }
  };

  return (
    <section className="bg-white rounded-lg p-4" data-easytag="id2-src/pages/Cart.js">
      {items.length === 0 ? (
        <div data-easytag="id3-src/pages/Cart.js">
          <Empty description="Корзина пуста" />
          <div className="mt-4" data-easytag="id4-src/pages/Cart.js">
            <Link to="/catalog" data-easytag="id5-src/pages/Cart.js"><Button type="primary" data-easytag="id6-src/pages/Cart.js">Перейти в каталог</Button></Link>
          </div>
        </div>
      ) : (
        <div data-easytag="id7-src/pages/Cart.js">
          <List
            dataSource={items}
            itemLayout="horizontal"
            data-easytag="id8-src/pages/Cart.js"
            renderItem={(item) => (
              <List.Item
                actions={[
                  <div key="qty" className="flex items-center gap-2" data-easytag="id9-src/pages/Cart.js">
                    <span data-easytag="id10-src/pages/Cart.js">Кол-во:</span>
                    <InputNumber min={1} value={item.qty} onChange={(v) => handleQty(item.productId || item.product?._id, v)} data-easytag="id11-src/pages/Cart.js" />
                  </div>,
                  <Button key="rm" danger onClick={() => handleRemove(item.productId || item.product?._id)} data-easytag="id12-src/pages/Cart.js">Удалить</Button>
                ]}
              >
                <List.Item.Meta
                  title={<div className="font-medium" data-easytag="id13-src/pages/Cart.js">{item.title || item.product?.title || 'Товар'}</div>}
                  description={<div className="text-gray-600" data-easytag="id14-src/pages/Cart.js">Цена: {Number(item.price || item.product?.price || 0).toFixed(2)} ₽</div>}
                />
              </List.Item>
            )}
          />
          <div className="flex items-center justify-between mt-6" data-easytag="id15-src/pages/Cart.js">
            <div className="text-xl font-bold" data-easytag="id16-src/pages/Cart.js">Итого: {Number(total).toFixed(2)} ₽</div>
            <div className="flex gap-2" data-easytag="id17-src/pages/Cart.js">
              <Button onClick={handleClear} data-easytag="id18-src/pages/Cart.js">Очистить</Button>
              <Button type="primary" onClick={() => navigate('/checkout')} data-easytag="id19-src/pages/Cart.js">Оформить заказ</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
