import React from 'react';
import { Button, List, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Cart = () => {
  return (
    <div data-easytag="id1-src/pages/Cart.jsx" className="space-y-6">
      <Title level={3} data-easytag="id2-src/pages/Cart.jsx" className="!mb-2">Корзина</Title>
      <List
        data-easytag="id3-src/pages/Cart.jsx"
        bordered
        dataSource={[{ id: 1, title: 'Товар 1', price: 1990 }]}
        renderItem={(item) => (
          <List.Item data-easytag={`id4-${item.id}-src/pages/Cart.jsx`} className="flex items-center justify-between">
            <div data-easytag={`id5-${item.id}-src/pages/Cart.jsx`}>
              <div data-easytag={`id6-${item.id}-src/pages/Cart.jsx`} className="font-medium">{item.title}</div>
              <div data-easytag={`id7-${item.id}-src/pages/Cart.jsx`} className="text-gray-500 text-sm">1 шт.</div>
            </div>
            <div data-easytag={`id8-${item.id}-src/pages/Cart.jsx`} className="font-semibold">{item.price} ₽</div>
          </List.Item>
        )}
      />
      <div data-easytag="id9-src/pages/Cart.jsx" className="flex items-center justify-between">
        <div data-easytag="id10-src/pages/Cart.jsx" className="text-lg">Итого: <span className="font-semibold">1 990 ₽</span></div>
        <Link to="/checkout" data-easytag="id11-src/pages/Cart.jsx">
          <Button type="primary" size="large">Оформить</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
