import React from 'react';
import { Form, Input, Radio, Button, Typography, Card } from 'antd';

const { Title } = Typography;

const Checkout = () => {
  return (
    <div data-easytag="id1-src/pages/Checkout.jsx" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section data-easytag="id2-src/pages/Checkout.jsx" className="lg:col-span-2 space-y-6">
        <Card data-easytag="id3-src/pages/Checkout.jsx">
          <Title level={4} data-easytag="id4-src/pages/Checkout.jsx" className="!mb-4">Доставка</Title>
          <Form layout="vertical" data-easytag="id5-src/pages/Checkout.jsx">
            <Form.Item label="Имя и фамилия" data-easytag="id6-src/pages/Checkout.jsx">
              <Input placeholder="Иван Иванов" data-easytag="id7-src/pages/Checkout.jsx" />
            </Form.Item>
            <Form.Item label="Адрес" data-easytag="id8-src/pages/Checkout.jsx">
              <Input placeholder="Город, улица, дом, квартира" data-easytag="id9-src/pages/Checkout.jsx" />
            </Form.Item>
            <Form.Item label="Телефон" data-easytag="id10-src/pages/Checkout.jsx">
              <Input placeholder="+7" data-easytag="id11-src/pages/Checkout.jsx" />
            </Form.Item>
          </Form>
        </Card>
        <Card data-easytag="id12-src/pages/Checkout.jsx">
          <Title level={4} data-easytag="id13-src/pages/Checkout.jsx" className="!mb-4">Оплата</Title>
          <Radio.Group data-easytag="id14-src/pages/Checkout.jsx" defaultValue="card">
            <Radio value="card" data-easytag="id15-src/pages/Checkout.jsx">Банковская карта</Radio>
            <Radio value="cash" data-easytag="id16-src/pages/Checkout.jsx">Наличными</Radio>
          </Radio.Group>
        </Card>
      </section>
      <aside data-easytag="id17-src/pages/Checkout.jsx" className="lg:col-span-1">
        <Card data-easytag="id18-src/pages/Checkout.jsx" className="space-y-3">
          <div data-easytag="id19-src/pages/Checkout.jsx" className="flex items-center justify-between">
            <span data-easytag="id20-src/pages/Checkout.jsx">Товары</span>
            <span data-easytag="id21-src/pages/Checkout.jsx" className="font-medium">1 990 ₽</span>
          </div>
          <div data-easytag="id22-src/pages/Checkout.jsx" className="flex items-center justify-between">
            <span data-easytag="id23-src/pages/Checkout.jsx">Доставка</span>
            <span data-easytag="id24-src/pages/Checkout.jsx" className="font-medium">0 ₽</span>
          </div>
          <div data-easytag="id25-src/pages/Checkout.jsx" className="flex items-center justify-between text-lg">
            <span data-easytag="id26-src/pages/Checkout.jsx">Итого</span>
            <span data-easytag="id27-src/pages/Checkout.jsx" className="font-semibold">1 990 ₽</span>
          </div>
          <Button type="primary" size="large" block data-easytag="id28-src/pages/Checkout.jsx">Подтвердить заказ</Button>
        </Card>
      </aside>
    </div>
  );
};

export default Checkout;
